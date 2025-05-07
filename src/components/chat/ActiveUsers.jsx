import { useContext } from "react";
import ActiveUsersContext from "../../../utils/ActiveUsersContext";

const ActiveUsers = () => {
  const { activeUsers } = useContext(ActiveUsersContext);
  console.log(activeUsers);

  return (
    <>
      <div className="flex justify-center mb-4 cursor-pointer">
        <div className="flex max-w-96 bg-red-500 text-white rounded-lg mt-1 p-1 px-2 gap-3">
          <p>{activeUsers.join(",  ")} joined chat</p>
        </div>
      </div>
    </>
  );
};

export default ActiveUsers;
