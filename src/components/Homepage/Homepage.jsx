import { useState } from "react";
import Sidebar from "./Sidebar";
import Chatpage from "../chat/Chatpage";
import { Outlet } from "react-router-dom";
import {
  GroupOwnerProvider,
} from "../../../utils/GroupOwnerContext";
import NavBar from "../Header/NavBar";




const Homepage = () => {
  const [currGroup, setCurrGroup] = useState(null);

  return (
    <GroupOwnerProvider>
      <div className="flex h-[100%] ">
        <Sidebar currGroup={currGroup} setCurrGroup={setCurrGroup} />

        <div className="flex flex-col flex-1 h-[100vh]">
          <NavBar/>
        <Outlet />
        </div>
      </div>
    </GroupOwnerProvider>
  );
};

export default Homepage;
