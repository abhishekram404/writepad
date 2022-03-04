import { io } from "socket.io-client";

const isProduction = process.env.REACT_APP_NODE_ENV === "production";
const socket = io(
  isProduction ? "https://writepad-api.herokuapp.com" : "http://localhost:4000",
  {
    autoConnect: false,
  }
);

export default socket;
