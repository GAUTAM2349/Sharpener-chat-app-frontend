import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./src/components/Header/NavBar";
const Login = lazy(() => import("./src/components/auth/Login"));
import Signup from "./src/components/auth/Signup";
import Chatpage from "./src/components/chat/Chatpage";


import Homepage from "./src/components/Homepage/Homepage";
import CreateGroup from "./src/components/Group/CreateGroup";
import { PrivateRoute } from "./utils/PrivateRoute";
import { AuthProvider } from "./utils/AuthProvider";
import GroupInfo from "./src/components/chat/GroupInfo";


const AppLayout = () => {
  return (
    <>
    <AuthProvider>
    <PrivateRoute>
    <div className="relative bg-blue-600 hide-scrollbar !h-[100vh]">

        
          {/* <NavBar /> */}
          <Outlet />
        
      </div>
    </PrivateRoute>
    </AuthProvider>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // includes NavBar, Auth
    children: [
      {
        path: "/",
        element: <Homepage />, // ← always shows sidebar
        children: [
          {
            path: "chats/:groupId/:ownerId",
            element: <Chatpage />,
          },
          {
            path: "group-info/:groupId/:ownerId",
            element: <GroupInfo />,
          },
        ],
      },
      {
        path: "/create-group",
        element: <CreateGroup />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <RouterProvider router={appRouter} />
  
);   
