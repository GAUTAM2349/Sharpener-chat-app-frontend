

import { useEffect, useState, useRef, useContext } from 'react';
import AllUsers from './AllUsers';
import api from '../../../config/axiosConfig';
import AllUsersContext from '../../../utils/AllUsersContext';
import { AuthContext } from '../../../utils/AuthProvider';

const CreateGroup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const {loggedinUser:userId} = useContext(AuthContext);
  const formRef = useRef();

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/user');
        const users = response.data.users;
        console.log("got user response : ", response);
        setAllUsers(users);
      } catch (error) {
        console.log("an error occurred fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {

    event.preventDefault();
    
    try{

    const form = formRef.current;
    const formData = new FormData(form);

    const groupName = formData.get("groupName");
    const selectedUserIds = formData.getAll("selectedUsers");

    const data = {  groupName, userIds:selectedUserIds, adminId:userId};

    console.log("data sent is ",data);

    const response = await api.post('/group/add-group', data);
    console.log(response);

    }catch(error){
      console.log("error in creating group :  ",error);
    }
    
    
  };

  return (
    <>
      <div className="text-center mt-4">
        <button
          onClick={openModal}
          className="rounded-md bg-slate-800 py-2 px-4 text-white text-sm"
        >
          Open Modal
        </button>
      </div>

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto w-full max-w-[24rem] rounded-lg bg-white overflow-hidden"
          >
            <form ref={formRef} className="flex flex-col">
              {/* Header */}
              <div className="m-2 flex justify-center items-center h-24 rounded-md bg-green-400 text-white">
                <h3 className="text-2xl">Create Group +</h3>
              </div>

              {/* Form Inputs */}
              <div className="flex flex-col gap-4 p-6">
                <div className="w-full">
                  <label className="block mb-2 text-sm text-slate-600">Group Name</label>
                  <input
                    type="text"
                    name="groupName"
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400"
                    placeholder="Your Group Name"
                  />
                </div>

                {/* User Checkboxes */}
                <div className="mt-2">
                  <AllUsersContext.Provider value={{ users: allUsers }}>
                    <AllUsers 
                      selectable = {false}
                    />
                  </AllUsersContext.Provider>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full rounded-md bg-slate-800 py-2 px-4 text-white text-sm"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroup;

