import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import socket from "../../utils/Socket";
import InlineEditor from "../InlineEditor/InlineEditor";

export default function Writepad() {
  const [text, setText] = useState("");
  const [activeUsersCount, setActiveUserCount] = useState(0);
  const { setConnected, padCode } = useContext(AppContext);
  const { padCode: customCode } = useParams<{ padCode: string }>();

  const events = {
    handleTextChange: function (
      event: React.ChangeEvent<HTMLTextAreaElement>,
      editor: { getData: () => string }
    ) {
      const data = editor.getData();
      setText(data);
      socket.emit("send text update", { padCode, text: data });
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

  useEffect(() => {
    socket.on("receive text update", (newText) => {
      if (newText && newText !== text) {
        setText(newText);
      }
    });
  }, []);

  return (
    <div className="flex justify-center flex-col w-full md:w-[80%]  mx-auto px-4 py-5">
      <div className="flex items-center justify-between">
        <h5 className="text-2xl md:text-3xl text-slate-800 font-mono font-bold mb-1 ">
          Writepad
        </h5>
        <p>Active users: {activeUsersCount}</p>
      </div>
      <p className="text-sm md:text-xl text-slate-700 mb-4 font-mono">
        Realtime text based collaboration environment
      </p>
      <InlineEditor text={text} onChange={events.handleTextChange} />
    </div>
  );
}
