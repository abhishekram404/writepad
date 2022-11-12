import { io } from "socket.io-client";


const socket = io(
  process.env.SOCKET_URI,
  {
    autoConnect: false,
  }
);

export default socket;
