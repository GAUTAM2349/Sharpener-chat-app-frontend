import { useContext } from 'react';
import AllUsersContext from '../../../utils/AllUsersContext';
import SelectUser from './SelectUser';
import { AuthContext } from '../../../utils/AuthProvider';


const AllUsers = ({selctable,clickAction}) => {
  const { users } = useContext(AllUsersContext);
  const {user} = useContext(AuthContext);

  if (!users || users.length === 0) {
    return <div className="text-sm text-slate-500">No users found.</div>;
  }

  return (
    <>
      {users.map((user) => (
         <div key={user.id} className="flex flex-col">
          <SelectUser user={user} />
        </div>
      ))}
    </>
  );
};

export default AllUsers;
