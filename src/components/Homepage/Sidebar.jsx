import { useState, useEffect } from "react";
import api from "../../../config/axiosConfig";
import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";

const Sidebar = ({ currGroup ,setCurrGroup }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get("/group/all");
        console.log(response.data);
        if (response.data?.joinedGroups) {
          setGroups(response.data.joinedGroups);
        } else {
          setGroups([]); 
        }
      } catch (error) {
        if (error.response?.status === 401) {
          window.alert("will navigate to LOGIN bcz of unauthorization");
          navigate("/login");
        } else {
          console.error("Failed to fetch groups:", error);
        }
      } finally {
        setLoading(false);     
      }
    };
  
    fetchGroups();
  }, [navigate]); 
  

  return (
    <div className=" w-[35%] md:w-[40%] xl:w-[30%] h-[100vh] sticky top-0  hide-scrollbar overflow-scroll bg-green-300 border-r border-gray-300">
      
      <SidebarHeader setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      {/* Group List */}
      <div className="overflow-hidden  px-3 mb-9">
        {loading ? (
          <p className="text-gray-500 text-center mt-4">Loading groups...</p>
        ) : groups.length === 0 ? (
          <p className="text-gray-400 text-center mt-4">No groups found.</p>
        ) : (
          groups.map((group, index) => (
            <GroupList
              key={group.id || index}
              group={group}
              index={index}
              currGroup={currGroup}
              setCurrGroup={setCurrGroup}            />
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
