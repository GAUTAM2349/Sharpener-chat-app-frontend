// import { useState, useEffect, useContext } from "react";
// import Chats from "./Chats";
// import ChatInput from "./ChatInput";
// import ChatsContext from "../../../utils/ChatsContext";
// import api from "../../../config/axiosConfig";
// import { useNavigate, useParams } from "react-router-dom";
// import NavBar from "../Header/NavBar";
// import { GroupOwnerContext } from "../../../utils/GroupOwnerContext";
// import socket from "../../../config/socket";
// import { AuthContext } from "../../../utils/AuthProvider";

// const Chatpage = () => {
//   const [chats, setChats] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const { groupId: currGroup, ownerId } = useParams();
//   const { group } = useContext(GroupOwnerContext);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getChats = async () => {
//       let timeCursor = null;
//       try {
//         let storedChatsRaw = localStorage.getItem("storedChats");
//         let storedChats = storedChatsRaw ? JSON.parse(storedChatsRaw) : {};
//         let chat = storedChats[currGroup]?.messages;

//         if (chat) {
//           setChats(chat);
//           timeCursor = storedChats[currGroup]?.timeCursor;
//         }

//         if (!timeCursor) {
//           const tenYearsAgo = new Date();
//           tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
//           timeCursor = tenYearsAgo.toISOString();
//         }

//         const query = new URLSearchParams({ timeCursor }).toString();
//         const response = await api.get(`/chat/${currGroup}?${query}`);

//         setChats((prevChats) => {
//           const latestChats = [...prevChats, ...response.data.chats];
//           storedChats[currGroup] = {
//             messages: latestChats.slice(-20),
//             timeCursor: latestChats.at(-1)?.createdAt,
//           };
//           localStorage.setItem("storedChats", JSON.stringify(storedChats));
//           return latestChats;
//         });
//       } catch (error) {
//         console.log("Error fetching group chats:", error);
//       }
//     };

//     if (currGroup) getChats();
//   }, [currGroup]);

//   useEffect(() => {
//     if (!currGroup) return;

//     socket.emit("joinRoom", { currGroup, userId: user.id });

//     socket.on("chatMessage", (chat) => {
//       console.log("frontend got message ",chat)
//       setChats((prev) => [...prev, chat]);
//     });

//     socket.on("onlineUsers", (users) => {
//       console.log("\n\n\n i go users as :  ", users);
//       setOnlineUsers(users);
//     });

//     return () => {
//       socket.emit("leaveRoom", currGroup);
//       socket.off("chatMessage");
//       socket.off("onlineUsers");
//     };
//   }, [currGroup]);

//   return (
//     <div className="h-[50vh] w-full flex flex-col flex-1  pb-[10px] bg-amber-200 relative hide-scrollbar">
      

//       <div
//     className="fixed top-2 right-3 z-[1000] py-2 px-3 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
//     onClick={() => navigate(`/group-info/${currGroup}/${ownerId}`)}
//   >
//         {group.name}
//       </div>

      
//       <div className="absolute top-1 left-3 bg-white p-2 rounded shadow">
//         <strong>Online: {onlineUsers.length}</strong>
//       </div>

//       {chats && (
//         <div className="flex-1 overflow-y-scroll hide-scrollbar">
//           <ChatsContext.Provider value={{ chats }}>
//             <Chats />
//           </ChatsContext.Provider>
//           <ChatInput groupId={currGroup} socket={socket} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatpage;



import { useState, useEffect, useContext, useRef } from "react";
import Chats from "./Chats";
import ChatInput from "./ChatInput";
import ChatsContext from "../../../utils/ChatsContext";
import api from "../../../config/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Header/NavBar";
import { GroupOwnerContext } from "../../../utils/GroupOwnerContext";
import socket from "../../../config/socket";
import { AuthContext } from "../../../utils/AuthProvider";

const Chatpage = () => {
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { groupId: currGroup, ownerId } = useParams();
  const { group } = useContext(GroupOwnerContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  // Fetch chats from localStorage + server
  useEffect(() => {

    const getChats = async () => {

      setChats([]);
      
      let timeCursor = null;

      try {
        const storedChatsRaw = localStorage.getItem("storedChats");
        const storedChats = storedChatsRaw ? JSON.parse(storedChatsRaw) : {};
        const storedGroup = storedChats[currGroup];
        const storedMessages = storedGroup?.messages;

        if (storedMessages) {
          setChats(storedMessages);
          timeCursor = storedGroup?.timeCursor;
        }

        if (!timeCursor) {
          const tenYearsAgo = new Date();
          tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
          timeCursor = tenYearsAgo.toISOString();
        }

        const query = new URLSearchParams({ timeCursor }).toString();
        const response = await api.get(`/chat/${currGroup}?${query}`);
        const fetchedChats = response.data.chats;

        const mergedChats = [...(storedMessages || []), ...fetchedChats];
        const uniqueChats = Array.from(
          new Map(mergedChats.map((chat) => [chat.id, chat])).values()
        );

        const updatedStoredChats = {
          ...storedChats,
          [currGroup]: {
            messages: uniqueChats.slice(-20),
            timeCursor: uniqueChats.at(-1)?.createdAt || new Date().toISOString(),
          },
        };

        localStorage.setItem("storedChats", JSON.stringify(updatedStoredChats));
        setChats(uniqueChats);
      } catch (error) {
        console.log("Error fetching group chats:", error);
      }
    };

    if (currGroup) getChats();
  }, [currGroup]);

  // Socket.io: join room, handle new messages, track online users
  useEffect(() => {
  if (!currGroup || !user?.id) return;

  const handleNewMessage = (chat) => {
    console.log("Received new message via socket:", chat);

    setChats((prevChats) => {
      const exists = prevChats.some((msg) => msg.id === chat.id);
      return exists ? prevChats : [...prevChats, chat];
    });

    // Update localStorage
    const storedChatsRaw = localStorage.getItem("storedChats");
    const storedChats = storedChatsRaw ? JSON.parse(storedChatsRaw) : {};
    const updatedChats = [...(storedChats[currGroup]?.messages || []), chat].slice(-20);

    storedChats[currGroup] = {
      messages: updatedChats,
      timeCursor: updatedChats.at(-1)?.createdAt || new Date().toISOString(),
    };
    localStorage.setItem("storedChats", JSON.stringify(storedChats));
  };

  socket.on("chatMessage", handleNewMessage);
  socket.on("onlineUsers", setOnlineUsers);
  socket.emit("joinRoom", { currGroup, userId: user.id });

  return () => {
    socket.emit("leaveRoom", currGroup);
    socket.off("chatMessage", handleNewMessage);
    socket.off("onlineUsers", setOnlineUsers);
  };
}, [currGroup, user?.id]);

  // Auto-scroll to bottom when chats update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div className="h-[50vh] w-full flex flex-col flex-1 pb-[10px] bg-amber-200 relative hide-scrollbar">
      {/* Group Info Button */}
      <div
        className="fixed top-2 right-3 z-[1000] py-2 px-3 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
        onClick={() => navigate(`/group-info/${currGroup}/${ownerId}`)}
      >
        {group.name}
      </div>

      {/* Online Users Count */}
      <div className="absolute top-1 left-3 bg-white p-2 rounded shadow">
        <strong>Online: {onlineUsers.length}</strong>
      </div>

      {/* Chats List + Input */}
      {chats && (
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-scroll hide-scrollbar chat-container"
        >
          <ChatsContext.Provider value={{ chats }}>
            <Chats />
          </ChatsContext.Provider>
          <ChatInput groupId={currGroup} socket={socket} />
        </div>
      )}
    </div>
  );
};

export default Chatpage;
