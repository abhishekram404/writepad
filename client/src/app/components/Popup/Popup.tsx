import React, { useState } from "react";
import { Mode } from "../../Interfaces/IComponents/IPopup";
import { Props } from "../../Interfaces/IComponents/INavbar";
// type Props = {
//   mode
// };

export default function Popup({ mode, invitationLink = "" }: Props) {
  const [joinLink, setJoinLink] = useState("");
  return (
    <div className="popup shadow-lg shadow-slate-500 absolute w-[300px] rounded-md bg-slate-600 p-2  top-full right-0 translate-y-4 outline-none">
      <h3 className="text-white text-base font-mono mb-2 text-center">
        {mode === Mode.Invite ? "Invite collaborators" : "Join a pad"}
      </h3>
      <input
        type="text"
        value={mode === Mode.Invite ? invitationLink : joinLink}
        readOnly={mode === Mode.Invite ? true : false}
        onChange={(e) => setJoinLink(e.target.value)}
        className="w-full bg-slate-800 p-2 rounded  font-mono text-white mb-2"
      />
      <button className="bg-slate-900 p-2 rounded w-full text-white">
        {mode === Mode.Invite ? "Copy invitation link" : "Join Pad"}
      </button>
    </div>
  );
}
