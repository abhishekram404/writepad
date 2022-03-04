import React, { useEffect, useState } from "react";
import Writepad from "./Writepad";

import socket from "../utils/Socket";
import Navbar from "./Navbar/Navbar";
import AppContext from "../context/AppContext";
function App() {
  const [isConnected, setConnected] = useState(false);
  const [padCode, setPadCode] = useState("");
  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });
  });

  useEffect(() => {
    socket.on("pad joined", (joinCode) => {
      console.log("Joined in room", joinCode);
      setPadCode(joinCode);
    });
  }, []);

  useEffect(() => {
    socket.on("pad left", (padCode) => {
      console.log("Leaving pad ", padCode);
      setPadCode("");
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ padCode, setPadCode, isConnected, setConnected }}
    >
      <div className="App min-h-screen">
        <Navbar isConnected={isConnected} />
        <Writepad />
      </div>
    </AppContext.Provider>
  );
}

export default App;
