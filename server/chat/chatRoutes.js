import express from "express";
import isAuth from "../middleware/isAuth.js";
import chatCheck from "../body-check/chatCheck.js";
import * as chatControllers from "./chatControllers.js";

const router = express.Router();

router.post("/user", isAuth, chatControllers.getUser);

router.post("/create-chat", isAuth, chatCheck, chatControllers.postCreateChat);

router.post("/messages", isAuth, chatControllers.postMessages);

export default router;
