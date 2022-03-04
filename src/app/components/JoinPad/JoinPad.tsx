import React, { useEffect, useState } from "react";
import socket from "../../utils/Socket";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function JoinPad({}: Props) {
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
      console.log("Joined in room", joinCode);
      setPadCode(joinCode);
      navigate(`/${joinCode}`);
    });
  }, []);

  return (
    <div className="bg-slate-100 px-3 py-6 rounded w-[80%]  mx-auto">
      <h5 className="text-3xl text-slate-800 font-mono font-bold mb-1 ">
        Writepad
      </h5>
      <p className="text-xl text-slate-700 mb-4 font-mono">
        Realtime text based collaboration environment
      </p>
      <h4 className="text-xl mb-3 text-slate-600 font-mono">
        Join a pad and start collaborating now{" "}
      </h4>
      <form
        className="bg-white w-1/3 flex flex-col shadow-lg justify-start p-3 rounded"
        onSubmit={events.onSubmit}
      >
        <input
          type="text"
          placeholder="Enter Pad code here..."
          className="border mb-2 border-slate-400 rounded text-xl p-2 outline-none "
          value={padCode}
          onChange={events.onChange}
        />
        <button
          className="w-max px-3 py-2 rounded-md bg-slate-800 text-white"
          type="submit"
        >
          Join Pad
        </button>
      </form>
    </div>
  );
}
