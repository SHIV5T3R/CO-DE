import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/components/layout/rootLayout";
import EditorPage from "@/components/pages/editor";
import App from "./App";
import SignInPage from "@/components/pages/signIn";
import AuthGate from "./components/auth/AuthGate";
import GithubRedirectPage from "./components/pages/githubOauth";
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/callback/github",
        element: <GithubRedirectPage />,
      },
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/editor",
        element: (
          <AuthGate required>
            <EditorPage />
          </AuthGate>
        ),
      },
      {
        path: "/sign-in",
        element: (
          <AuthGate>
            <SignInPage />
          </AuthGate>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
