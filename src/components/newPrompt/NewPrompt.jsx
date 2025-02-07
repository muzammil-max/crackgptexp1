import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import React from "react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";

const chunkSize = 20; // number of characters per chunk
const chunkInterval = 1; // milliseconds between chunks

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="markdown-container">
      <Markdown
        children={content}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div
                className="code-block-container"
                style={{
                  // justifyContent: "center",
                  justifySelf: "center",

                  // display: "flex",
                  // textAlign: "center",
                  position: "relative",
                  overflowX: "auto",
                  width: "auto%",
                  maxWidth: "60%",
                  whiteSpace: "pre" /* Prevent wrapping */,
                }}
              >
                <div>
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
                <button
                  className="copy-button"
                  onClick={() =>
                    navigator.clipboard.writeText(String(children))
                  }
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "5px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    border: "none",
                    color: "#fff",
                    padding: "4px 10px",
                    fontSize: "12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    opacity: 0.5,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 2)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
                >
                  Copy
                </button>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          div({ node, className, children, ...props }) {
            if (className?.includes("math")) {
              return (
                <div
                  className="math-container"
                  style={{ textAlign: "center" }}
                  {...props}
                >
                  {children}
                </div>
              );
            }
            return <div {...props}>{children}</div>;
          },
          img({ node, ...props }) {
            return (
              <img
                {...props}
                style={{ margin: "0 auto", display: "block" }}
                alt=""
              />
            );
          },
          blockquote({ node, children, ...props }) {
            return (
              <blockquote className="styled-blockquote" {...props}>
                {children}
              </blockquote>
            );
          },
        }}
      />
    </div>
  );
};

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const isAtBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        50;
      if (isAtBottom) {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, isTyping]);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        50;
      if (!isAtBottom) {
        // Do nothing (or you could set some state if needed)
      }
    }
  };

  const addMessage = async (text) => {
    const userMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setQuestion("");
    setIsTyping(true);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "CrackGPT is thinking..." },
    ]);

    try {
      const conversationContext = updatedMessages.map((msg) => {
        return `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`;
      });

      const contextInput =
        Object.entries(img.aiData).length > 0
          ? [img.aiData, ...conversationContext, text]
          : [...conversationContext, text];

      const result = await model.generateContent(contextInput);
      const response = await result.response;
      let fullAnswer = await response.text();
      // fullAnswer = fullAnswer.replace(/\\/g, "");

      setMessages((prev) => prev.slice(0, -1));
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      let index = 0;
      const interval = setInterval(() => {
        if (index < fullAnswer.length) {
          const chunk = fullAnswer.slice(index, index + chunkSize);
          index += chunkSize;
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            newMessages[newMessages.length - 1] = {
              ...lastMsg,
              content: lastMsg.content + chunk,
            };
            return newMessages;
          });
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, chunkInterval);
    } catch (error) {
      console.error("Error generating content:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "CrackGPT is overloaded, please try again later.",
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    const textArea = form?.querySelector("textarea[name='text']");
    const text = textArea?.value;
    if (!text || !text.trim()) return;
    addMessage(text);
    textArea.value = "";
  };

  return (
    <>
      <div className="move">
        <div className="image">
          {img.isLoading && <div>Loading...</div>}
          {img.dbData?.filePath && (
            <IKImage
              className="myImg"
              urlEndpoint="https://ik.imagekit.io/ay7uluo9u"
              path={img.dbData?.filePath}
              width="300"
              transformation={[{ width: 300 }]}
            />
          )}
        </div>
      </div>
      <div
        className="chat-container"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className={message.role === "user" ? "user" : "assistant"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message.role === "assistant" && (
              <div className="logo-container">
                <img
                  src="/logo.png"
                  alt="CrackGPT Logo"
                  className="chat-logo"
                />
              </div>
            )}
            <MarkdownRenderer content={message.content} />
          </motion.div>
        ))}
        {isTyping && (
          <div className="message assistant typing-fade">
            <div className="logo-container">
              <img src="/logo.png" alt="CrackGPT Logo" className="chat-logo" />
            </div>
          </div>
        )}
        <div className="endChat" ref={endRef} />
      </div>
      <form className="newForm" autoComplete="off" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <textarea
          name="text"
          placeholder="Ask CrackGPT"
          rows="4"
          className="text"
          style={{
            resize: "none",
            fontFamily: "Inter, Arial, sans-serif",
            fontSize: "15px",
            marginBottom: "0px",
            marginTop: "0px",
            height: "55px",
            color: "white",
            overflowY: "scroll",
            scrollbarColor: "<color>{3}",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        ></textarea>
        <button type="submit">
          <img src="/send2.png" alt="Send" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
