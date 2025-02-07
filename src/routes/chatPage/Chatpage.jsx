import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";

const ChatPage = () => {
  return (
    <div className="chatpage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">test message from AI</div>
          <div className="message user">
            test message from user Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Soluta voluptas repellendus sit.
          </div>
          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
