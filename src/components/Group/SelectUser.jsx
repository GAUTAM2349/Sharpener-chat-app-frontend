const SelectUser = ({ user }) => {
  const inputId = `user-check-${user.id}`;

  return (
    <div>
      <label htmlFor={inputId} className="flex items-center cursor-pointer">
        <input
          id={inputId}
          type="checkbox"
          name="selectedUsers"
          value={user.id}
          className="mr-2 h-4 w-4 border border-slate-300 rounded"
        />
        {user.name}
      </label>
    </div>
  );
};

export default SelectUser;
