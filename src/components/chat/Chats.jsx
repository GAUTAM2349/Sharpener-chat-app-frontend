import { useContext, useEffect, useRef } from "react";
import ChatsContext from "../../../utils/ChatsContext";
import OutgoingMessage from "./OutgoingMessage";
import IncomingMessage from "./IncomingMessage";
import { AuthContext } from "../../../utils/AuthProvider";


const Chats = () => {

    const {chats} = useContext(ChatsContext);
    const {loggedinUser:userId} = useContext(AuthContext);
    
    const bottomRef = useRef(null);

    useEffect(() => {
      
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);

    

    return (
        <>
        <div className="bg-blue-400 w-full overflow-scroll h-[100%] py-3.5 hide-scrollbar ">
        {chats.map( (chat,idx) => {
            
            if(chat.senderId == userId)
            return  (<OutgoingMessage key={idx+"chat"} chat={chat}/>)
            return (<IncomingMessage key={idx+"chat"} chat={chat}/>)
            
        }) }
         <div ref={bottomRef} />
         </div>
        </>
    )
    
}

export default Chats;