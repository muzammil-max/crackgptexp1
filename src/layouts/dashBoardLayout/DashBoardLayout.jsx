import React from "react";
import "./dashBoardLayout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import ChatList from "../../components/chatList/ChatList";
import Chatpage from "../../routes/chatPage/Chatpage";
import NewPrompt from "../../components/newPrompt/NewPrompt";
const DashBoardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  // if (!isLoaded) return "Loading...";

  return (
    <div className="dashBoardLayout">
      {/* <div className="menu">
        <ChatList />
      </div> */}
      <div className="content">
        {/* <NewPrompt /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
