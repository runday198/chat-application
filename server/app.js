import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import http from "http";
import cors from "cors";

import sequelize from "./util/database.js";
import User from "./models/user.js";
import ChatUser from "./models/chatUser.js";
import Chat from "./models/chat.js";
import Message from "./models/message.js";

import { initializeSocket } from "./socket.js";

import * as authRoutes from "./auth/authRoutes.js";
import * as chatRoutes from "./chat/chatRoutes.js";

import { logErrorMiddleware } from "./errors/errorHandler.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = initializeSocket(httpServer);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(authRoutes.default);
app.use(chatRoutes.default);

app.use(logErrorMiddleware);

const PORT = process.env.PORT || 5000;

User.belongsToMany(Chat, { through: ChatUser });
Chat.belongsToMany(User, { through: ChatUser });
User.hasMany(Message, { onDelete: "CASCADE" });
Message.belongsTo(User);
Chat.hasMany(Message, { onDelete: "CASCADE" });
Message.belongsTo(Chat);

sequelize
  .sync()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
