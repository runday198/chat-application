import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

import User from "../models/user.js";
import Api500Error from "../errors/Api500Error.js";

dotenv.config();

export async function postSignup(req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  var { email, username, password } = req.body;

  try {
    let hashedPass = await bcrypt.hash(password, 12);
    let inviteToken = crypto.randomBytes(16).toString("hex");

    await User.create({
      email,
      username,
      password: hashedPass,
      inviteToken,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    let error = new Api500Error(err);

    next(error);
  }
}

export async function postLogin(req, res, next) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  try {
    let token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } catch (err) {
    let error = new Api500Error(err);
    next(error);
  }
}

export function postCheckUser(req, res, next) {
  return res.status(200).json({
    success: true,
  });
}
