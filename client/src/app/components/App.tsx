import React, { useEffect, useState } from "react";
import Writepad from "./Writepad";

import socket from "../utils/Socket";
import Navbar from "./Navbar/Navbar";
function App() {
  const [isConnected, setConnected] = useState(false);
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

  return (
    <div className="App min-h-screen">
      <Navbar isConnected={isConnected} />
      <Writepad />
    </div>
  );
}

export default App;
