import React from "react";
import "./dashboardpage.css";
const dashboardPage = () => {
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>CrackGPT</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat1.png" />
            <span>Chat with AI</span>
          </div>
          <div className="option">
            <img src="/scan.png" alt="" />
            <span>Analyze Image</span>
          </div>
          <div className="option">
            <img src="/study.png" alt="" />
            <span>Ask any study related queries</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form>
          <input type="text" placeholder="Ask CrackGPT" />
          <button>
            <img src="/send2.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default dashboardPage;
