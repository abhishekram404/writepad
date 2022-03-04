import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "./context/AppContext";
import socket from "../../utils/Socket";

type Props = {};

export default function Writepad({}: Props) {
  const [text, setText] = useState("");
  const [activeUsersCount, setActiveUserCount] = useState(0);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    autoScroll(e);
  };

  const { padCode: customCode } = useParams<{ padCode: string }>();
  // console.log(params);

  const { setConnected } = useContext(AppContext);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join pad", customCode);
    });

    socket.on("new user", (count) => {
      setActiveUserCount(count);
    });
  }, []);

  const textarea = useRef<any>();

  function autoScroll(e: any) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    textarea.current.scrollTop = textarea.current.scrollHeight;
  }
  return (
    <div className="flex justify-center flex-col w-[80%] mx-auto py-10">
      <div className="flex items-center justify-between">
        <h5 className="text-3xl text-slate-800 font-mono font-bold mb-1 ">
          Writepad
        </h5>
        <p>Active users: {activeUsersCount}</p>
      </div>
      <p className="text-xl text-slate-700 mb-4 font-mono">
        Realtime text based collaboration environment
      </p>
      <textarea
        name="writepad"
        id="writepad"
        className="border border-slate-400 outline-none transition-all leading-7 border-1 w-full p-4"
        onChange={handleTextChange}
        value={text}
        ref={textarea}
      ></textarea>
    </div>
  );
}
