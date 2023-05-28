import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./views/Root";
import Login, { action as loginAction } from "./views/auth/Login";
import Signup, { action as signupAction } from "./views/auth/Signup";
import Home, { loader as homeLoader } from "./views/chat/Home";
import Logout from "./views/auth/Logout";

// auth checkers
import RequireAuth from "./helpers/RequireAuth";
import RequireNotAuth from "./helpers/RequireNotAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: (
          <RequireNotAuth>
            <Login />
          </RequireNotAuth>
        ),
        action: loginAction,
      },
      {
        path: "/signup",
        element: (
          <RequireNotAuth>
            <Signup />
          </RequireNotAuth>
        ),
        action: signupAction,
      },
      {
        path: "/home",
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
        loader: homeLoader,
        children: [
          {
            path: "/home/logout",
            element: <Logout />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
