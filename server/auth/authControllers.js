import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";

dotenv.config();

export async function postSignup(req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  var { email, username, password } = req.body;

  try {
    let hashedPass = await bcrypt.hash(password, 12);

    await User.create({
      email,
      username,
      password: hashedPass,
    });

    return res.status(200).json();
  } catch (err) {
    res.status(500).json();
    next(err);
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
    res.status(500).json();
    next(err);
  }
}
