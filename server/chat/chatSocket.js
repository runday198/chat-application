import { Server } from "socket.io";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Chat from "../models/chat.js";
import registerChatHandlers from "./chatHandlers.js";

dotenv.config();

export function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN,
    },
  });

  io.use(async (socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      let token = socket.handshake.auth.token;
      // decrypt token and verify
      let isLoggedIn = jwt.verify(token, process.env.JWT_SECRET);
      let userId = isLoggedIn.userId;

      let user = await User.findByPk(userId);
      if (!user) {
        next(new Error("Authentication error"));
      }

      socket.user = { id: user.id, username: user.username };
      next();
    } else {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", async (socket) => {
    console.log("Socket connected at", socket.user);
    registerChatHandlers(io, socket);

    try {
      var user = await User.findByPk(socket.user.id, {
        include: {
          model: Chat,
        },
      });
      user.status = true;

      user.save();

      user.chats.forEach((chat) => {
        socket.join("chat:" + chat.id);
      });
    } catch (err) {
      console.log(err);
      throw new Error("Error joining chat");
    }
  });
}
