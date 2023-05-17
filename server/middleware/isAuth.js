import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export default async function isAuth(req, res, next) {
  try {
    let authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(400).json({ success: false });
    }

    let token = authHeader.split(" ")[1];

    console.log("HERE");
    let isLoggedIn = jwt.verify(token, process.env.JWT_SECRET);
    let userId = isLoggedIn.userId;

    let user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("HERE");
    next(err);
  }
}
