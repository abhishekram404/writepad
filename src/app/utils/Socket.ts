import { io } from "socket.io-client";

const isProduction = process.env.REACT_APP_NODE_ENV === "production";
const socket = io(
  isProduction ? "https://writepad-api.herokuapp.com" : "http://localhost:4000",
  {
    autoConnect: false,
    extraHeaders: {
      "Access-Control-Allow-Origin": isProduction
        ? "https://abhishekram-404-writepad.netlify.app"
        : "http://localhost:3000",
    },
  }
);

export default socket;
