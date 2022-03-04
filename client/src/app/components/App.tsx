import React, { useEffect, useState } from "react";
import Writepad from "./Writepad/Writepad";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import socket from "../utils/Socket";
import Navbar from "./Navbar/Navbar";
import AppContext from "./Writepad/context/AppContext";
import JoinPad from "./JoinPad/JoinPad";
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

  return (
    <AppContext.Provider
      value={{ padCode, setPadCode, isConnected, setConnected }}
    >
      <div className="App min-h-screen">
        <Router>
          <Navbar isConnected={isConnected} />
          <Routes>
            <Route path="/" element={<JoinPad />} />
            <Route path="/:padCode" element={<Writepad />} />
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
