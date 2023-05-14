import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./views/Root";
import Login, { action as loginAction } from "./views/auth/Login";
import Signup, { action as signupAction } from "./views/auth/Signup";
import Home from "./views/chat/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/signup",
        element: <Signup />,
        action: signupAction,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
