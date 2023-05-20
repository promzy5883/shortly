export default function Modal({ cancel, confirm, question, type }) {
  return (
    <div className="fixed top-0 z-50 w-full h-screen bg-[rgba(0,0,0,0.1)] flex left-0 justify-center items-center">
      <div className="bg-[hsl(255,100%,99%)] w-60 h-36 rounded box-border py-4 px-4 flex flex-col justify-between">
        <p className="text-[15px] font-semibold text-[rgba(0,0,0,0.7)]">
          Are you sure <br /> {question}
        </p>
        <div className="flex justify-between w-full">
          <button
            onClick={cancel}
            className="w-[45%] bg-[rgba(0,0,0,0.2)] flex justify-center items-center rounded h-8 text-xs hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="w-[45%] bg-red-500 text-white flex justify-center items-center rounded h-8 text-xs hover:scale-105"
          >
            {type === "logout" ? "LogOut" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
