import React, { useEffect, useState } from "react";
import socket from "../../utils/Socket";
import { useNavigate } from "react-router-dom";

export default function JoinPad() {
  const [padCode, setPadCode] = useState("");
  const navigate = useNavigate();
  const events = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setPadCode(e.target.value);
    },
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      socket.emit("join pad", padCode);
    },
  };

  useEffect(() => {
    socket.on("pad joined", (joinCode) => {
      setPadCode(joinCode);
      navigate(`/${joinCode}`);
    });
  }, []);

  return (
    <div className="bg-slate-100 px-4 sm:px-8 py-6 rounded w-full sm:w-[80%] h-screen  mx-auto">
      <h5 className="text-2xl sm:text-3xl text-slate-800 font-mono font-bold mb-1 ">
        Writepad
      </h5>
      <p className="text-base sm:text-xl text-slate-700 mb-4 font-mono">
        Realtime text based collaboration environment
      </p>
      <h4 className="text-base sm:text-xl mb-3 text-slate-600 font-mono">
        Join a pad and start collaborating now{" "}
      </h4>
      <form
        className="bg-white w-full  sm:w-[60%] md:w-[40%] flex flex-col shadow-lg justify-start p-2 sm:p-3 rounded"
        onSubmit={events.onSubmit}
      >
        <input
          type="text"
          placeholder="Enter Pad code here..."
          className="border mb-2 border-slate-400 rounded text-sm sm:text-lg p-2 outline-none "
          value={padCode}
          onChange={events.onChange}
        />
        <button
          className="w-max px-2 py-2 text-sm sm:text-base rounded-md bg-slate-800 text-white"
          type="submit"
        >
          Join Pad
        </button>
      </form>
    </div>
  );
}
