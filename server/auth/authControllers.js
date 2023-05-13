import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/user.js";

export async function postSignup(req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  var { email, username, password } = req.body;

  try {
    let hashedPass = bcrypt.hash(password, 12);

    await User.create({
      email,
      username,
      password: hashedPass,
    });

    return res.status(200);
  } catch (err) {
    res.status(500);
    next(err);
  }
}
