import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { customAlphabet } from "nanoid";
const generatePadCode = customAlphabet("abcdefghijklmnopqrstuvwxyz", 6);
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("A new client connected");

  socket.on("join pad", (joinCode) => {
    console.log(joinCode);
    for (let room in socket.rooms) {
      if (socket.id !== room) {
        socket.leave(room);
      }
    }

    let code = joinCode || generatePadCode();
    socket.join(code);
    console.log(socket.rooms);
    socket.emit("pad joined", code);
  });

  socket.on("leave pad", (padCode) => {
    socket.leave(padCode);
    console.log(socket.rooms);
    socket.emit("pad left", padCode);
  });
});

httpServer.listen(4000);
