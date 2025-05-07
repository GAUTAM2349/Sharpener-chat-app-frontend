import { useContext, useState } from "react";
import api from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthProvider";
import socket from "../../../config/socket";

const ChatInput = ({ groupId, socket }) => {
  const [message, setMessage] = useState("");
  const { loggedinUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSend = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    try {
      socket.emit("chatMessage", {
        roomId: groupId,
        message: trimmedMessage,
        sender: {
          id: loggedinUser,
          name: `User-${loggedinUser}`,
        },
      });

      await api.post(`/chat`, {
        senderId: loggedinUser,
        groupId,
        message: trimmedMessage,
      });

      setMessage("");
    } catch (error) {
      console.log("Failed to send message:", error);
    }
  };

  return (
    <footer className="bg-amber-200 border-t absolute bottom-0 border-green-300 w-[99%] p-2 ">
      <div className="flex  items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full h-[7vh] p-2 rounded-2xl border bg-white border-blue-400 focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`px-4 py-2 h-[7vh] mx-0.5 rounded-2xl ml-2 text-white ${
            message.trim()
              ? "bg-indigo-500 hover:bg-indigo-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>
    </footer>
  );
};

export default ChatInput;
