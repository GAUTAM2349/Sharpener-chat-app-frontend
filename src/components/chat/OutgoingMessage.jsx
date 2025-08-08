const OutgoingMessage = ({ chat }) => {
  return (
    <>
      <div className="flex justify-end mb-4 cursor-pointer">
        <div className="flex max-w-96 bg-green-400 text-white rounded-lg pt-2 px-3 pb-1  gap-3">
          <p> {chat.message} </p> <span>⋮</span>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img
            src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="My Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default OutgoingMessage;