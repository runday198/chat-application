import express from "express";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.get("/user", isAuth);
