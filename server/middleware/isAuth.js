import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from "dotenv";
import Api404Error from "../errors/Api404Error.js";
import Api400Error from "../errors/Api400Error.js";

dotenv.config();

export default async function isAuth(req, res, next) {
  try {
    let authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new Api400Error("Is not Authorized");
    }

    let token = authHeader.split(" ")[1];

    let isLoggedIn = jwt.verify(token, process.env.JWT_SECRET);
    let userId = isLoggedIn.userId;

    let user = await User.findByPk(userId);
    if (!user) {
      throw new Api404Error("Could not find the user");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
