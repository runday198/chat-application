import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

var socketInstance = null;

export function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN,
    },
  });

  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      socket.token = socket.handshake.auth.token;
      next();
    } else {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    socketInstance = socket;
    console.log("Socket connected", socket.token);
  });
}

export function getSocket() {
  return socketInstance;
}
