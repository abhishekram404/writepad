import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import socket from "../../utils/Socket";

type Props = {};

export default function Writepad({}: Props) {
  const [text, setText] = useState("");
  const [activeUsersCount, setActiveUserCount] = useState(0);
  const { setConnected, padCode, isConnected } = useContext(AppContext);
  const { padCode: customCode } = useParams<{ padCode: string }>();
  const navigate = useNavigate();

  const events = {
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
      socket.emit("send text update", { padCode, text: e.target.value });
      events.autoScroll(e);
    },
    autoScroll: (e: any) => {
      e.target.style.height = "inherit";
      e.target.style.height = `${e.target.scrollHeight}px`;
      textarea.current.scrollTop = textarea.current.scrollHeight;
    },
  };

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

  useEffect(() => {
    socket.on("receive text update", (newText) => {
      if (newText !== text) {
        setText(newText);
      }
      console.log(newText);
    });
  }, []);

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
        onChange={events.handleTextChange}
        value={text}
        ref={textarea}
      ></textarea>
    </div>
  );
}
