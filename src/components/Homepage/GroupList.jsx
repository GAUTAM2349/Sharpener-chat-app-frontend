import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GroupOwnerContext } from "../../../utils/GroupOwnerContext";

const GroupList = ({ index, group, setCurrGroup }) => {
  const navigate = useNavigate();
  const { setGroup } = useContext(GroupOwnerContext);

  return (
    <div
      key={index}
      className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
      onClick={() => {
        setCurrGroup(group.id);
        setGroup(group);
        console.log("set group id to", group.id);

        setTimeout(() => {
          navigate(`chats/${group.id}/${group.ownerId}`, {
            state: { ownerId: group.ownerId },
          });
        }, 0);
      }}
    >
      <div
        className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-white font-bold"
        style={{ backgroundColor: "#" + (group.color || "6b7280") }}
      >
        {group.name?.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{group.name}</h2>
        <p className="text-gray-600">
          {group.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default GroupList;
