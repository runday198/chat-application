import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

var io = null;
var socketInstance = null;

export function initializeSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN,
    },
  });

  io.on("connection", (socket) => {
    socketInstance = socket;
    console.log("new client connected with id ", socket.id);
    socket.on("disconnect", () => {
      console.log("The client disconnected");
    });
  });
}

export function socket() {
  return socketInstance;
}

export function getIo() {
  return io;
}
