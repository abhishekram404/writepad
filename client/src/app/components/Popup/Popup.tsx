import React, { useState } from "react";
import { Mode, Props } from "../../Interfaces/IComponents/IPopup";
import socket from "../../utils/Socket";
import clsx from "clsx";

export default function Popup({
  mode,
  invitationLink = "",
  setShowInvitePopup,
  setShowJoinPopup,
}: Props) {
  const [joinCode, setJoinCode] = useState("");

  const joinPad = (e: React.FormEvent) => {
    e.preventDefault();
    switch (mode) {
      case Mode.Join:
        if (!joinCode) {
          return;
        }
        socket.emit("join pad", joinCode);
        setShowInvitePopup(false);
        setShowJoinPopup(false);
        return;
      case Mode.Invite:
        alert("Copy to clipboard");
        return;
      default:
        return;
    }
  };

  return (
    <form
      onSubmit={joinPad}
      className="popup shadow-lg shadow-slate-500 absolute w-[300px] rounded-md bg-slate-600 p-2  top-full right-0 translate-y-4 outline-none"
    >
      <h3 className="text-white text-base font-mono mb-2 text-center">
        {mode === Mode.Invite ? "Invite collaborators" : "Join a pad"}
      </h3>
      <input
        type="text"
        value={mode === Mode.Invite ? invitationLink : joinCode}
        readOnly={mode === Mode.Invite ? true : false}
        onChange={(e) => setJoinCode(e.target.value)}
        className="w-full bg-slate-800 p-2 rounded  font-mono text-white mb-2"
        placeholder="Paste a join code here..."
      />
      <button
        disabled={!joinCode}
        className={clsx(
          "bg-slate-900 p-2 rounded w-full text-white",
          mode === Mode.Join && !joinCode && "opacity-40 cursor-not-allowed"
        )}
        type="submit"
      >
        {mode === Mode.Invite ? "Copy invitation link" : "Join Pad"}
      </button>
    </form>
  );
}
