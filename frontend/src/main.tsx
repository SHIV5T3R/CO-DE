import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/components/layout/rootLayout";
import EditorPage from "@/components/pages/editor";
import App from "./App";
import SignInPage from "@/components/pages/signIn";
import SignUpPage from "@/components/pages/signUp";
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/editor",
        element: <EditorPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
