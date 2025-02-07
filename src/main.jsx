import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Homepage from "./routes/homepage/Homepage.jsx";
import { Homepage } from "./routes/Homepage/Homepage.jsx";

import DashboardPage from "./routes/dashboardPage/dashboardPage.jsx";
import RootLayout from "./layouts/rootLayout/RootLayout.jsx";
import DashBoardLayout from "./layouts/dashBoardLayout/DashBoardLayout.jsx";
import SigninPage from "./routes/signinPage/SigninPage.jsx";
import SignupPage from "./routes/signupPage/SignupPage.jsx";
import ChatPage from "./routes/chatPage/Chatpage.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/sign-in/*",
        element: <SigninPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignupPage />,
      },
      {
        element: <DashBoardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <ChatPage />,
          },
          // {
          //   path: "/dashboard/chats/:id",
          //   element: <ChatPage />,
          // }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
