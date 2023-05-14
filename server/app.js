import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

import sequelize from "./util/database.js";
import User from "./models/user.js";

import * as authRoutes from "./auth/authRoutes.js";
import { logErrorMiddleware } from "./errors/errorHandler.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(authRoutes.default);

app.use(logErrorMiddleware);

const PORT = process.env.PORT || 5000;

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
