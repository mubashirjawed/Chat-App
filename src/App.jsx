import React from "react";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Loading from "./screens/Loading";
import Signup from "./screens/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/", element: <Loading /> },
    { path: "/chat", element: <Chat /> },
    { path: "/home", element: <Home /> },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
