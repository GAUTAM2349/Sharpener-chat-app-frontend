import { useContext, useEffect, useState } from "react";
import api from "../../../config/axiosConfig";
import { useLocation, useParams } from "react-router-dom";
import { GroupOwnerContext } from "../../../utils/GroupOwnerContext";
import { AuthContext } from "../../../utils/AuthProvider";

const GroupInfo = () => {
  const [members, setMembers] = useState([]);
  const { groupId, ownerId } = useParams();
  const { loggedinUser: userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get(`/group/group-members/${groupId}`);
        console.log("members response ", response.data);
        setMembers(response.data.groupMembers || []);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    if (groupId) fetchMembers();
  }, [groupId]);

  const makeAdmin = async (groupId, userId) => {
    try {
      const response = await api.post(`group/add-admin/${groupId}/${userId}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMember = async (groupId, userId) => {
    try {
      const response = await api.delete(
        `/group/delete-member/${groupId}/${userId}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-[100%] bg-amber-50 shadow-lg border border-gray-300 rounded-md z-10">
      <div className="flex justify-between items-center p-2 bg-gray-100 border-b">
        <span className="font-semibold">Group Members</span>
      </div>
      <ul className=" h-[90vh] overflow-y-auto">
        {members.map((member) => (
          <li
            key={member.id}
            className="flex p-2 border-b last:border-none items-center justify-between"
          >
            <div className="font-medium">{member.name}</div>

            <div className="flex">
              {member.id == ownerId && (
                <div className=" bg-amber-600 md:mx-10 text-white p-1 px-2 rounded-2xl">
                  {" "}
                  owner{" "}
                </div>
              )}
              {member.id != ownerId && member.group_members.role == "admin" && (
                <div className="text-green-500 cursor-pointer ">admin</div>
              )}
              {member.id != ownerId && userId == ownerId && (
                <div
                  onClick={() => deleteMember(groupId, member.id)}
                  className="bg-red-500 cursor-pointer mx-1 text-white p-1 px-2 rounded-2xl"
                >
                  remove
                </div>
              )}
              {member.id != ownerId &&
                userId == ownerId &&
                member.group_members.role != "admin" && (
                  <div
                    onClick={() => makeAdmin(groupId, member.id)}
                    className="bg-green-600 mx-1 cursor-pointer text-white p-1 px-2 rounded-2xl"
                  >
                    make admin
                  </div>
                )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupInfo;
