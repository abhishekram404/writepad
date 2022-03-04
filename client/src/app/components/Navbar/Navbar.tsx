import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import Popup from "../Popup/Popup";
import { Mode } from "../../Interfaces/IComponents/IPopup";
import AppContext from "../Writepad/context/AppContext";
import socket from "../../utils/Socket";
import { useNavigate } from "react-router-dom";
type Props = {
  isConnected: boolean;
};

export default function Navbar({ isConnected }: Props) {
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const navigate = useNavigate();
  const { padCode, setPadCode } = useContext(AppContext);
  const toggleInvite = () => {
    setShowJoinPopup(false);
    setShowInvitePopup(!showInvitePopup);
  };

  const toggleJoin = () => {
    setShowInvitePopup(false);
    setShowJoinPopup(!showJoinPopup);
  };

  const leaveRoom = () => {
    socket.emit("leave pad", padCode);
  };

  useEffect(() => {
    socket.on("pad left", (padCode) => {
      console.log("Leaving pad ", padCode);
      setPadCode("");
      navigate("/");
    });
  }, []);

  useEffect(() => {
    socket.on("pad joined", (joinCode) => {
      console.log("Joined in room", joinCode);
      setPadCode(joinCode);
      navigate(`/${joinCode}`);
    });
  }, []);

  return (
    <nav className="bg-slate-900  px-10 py-2 flex items-center justify-between ">
      <div className="flex items-center">
        <h1 className="text-white font-bold font-mono">Writepad&nbsp;</h1>
        <p className="text-slate-300 font-light font-mono text-sm">
          - A realtime text based collaboration environment
        </p>
      </div>

      <div className="relative flex items-center ">
        {padCode && (
          <>
            <div
              className=" mr-4 px-4 py-1 text-slate-300 border text-sm rounded-sm border-slate-300 outline-none cursor-pointer select-none"
              onClick={toggleInvite}
            >
              Invite
            </div>
            {showInvitePopup && (
              <Popup
                mode={Mode.Invite}
                invitationLink="http://localhost:3000/7xfbrc"
                setShowInvitePopup={setShowInvitePopup}
                setShowJoinPopup={setShowJoinPopup}
              />
            )}
          </>
        )}
        {padCode ? (
          <div
            className="relative mr-4 px-4 py-1 text-red-700 border text-sm rounded-sm border-red-700 outline-none cursor-pointer select-none"
            onClick={leaveRoom}
          >
            Leave
          </div>
        ) : (
          <>
            <div
              className="relative mr-4 px-4 py-1 text-slate-300 border text-sm rounded-sm border-slate-300 outline-none cursor-pointer select-none"
              onClick={toggleJoin}
            >
              Join
            </div>
            {showJoinPopup && (
              <Popup
                mode={Mode.Join}
                setShowInvitePopup={setShowInvitePopup}
                setShowJoinPopup={setShowJoinPopup}
              />
            )}
          </>
        )}
        <span
          className={clsx(
            "w-5 h-5 border-white border-2  rounded-full ml-auto ",
            isConnected ? "bg-green-600" : "bg-red-600"
          )}
          title={isConnected ? "Connected" : "Disconnected"}
        ></span>
        <span className="text-white pl-4 font-mono ">{padCode}</span>
      </div>
    </nav>
  );
}
