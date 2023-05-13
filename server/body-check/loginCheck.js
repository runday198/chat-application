import { body } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/user.js";

const loginCheck = [
  body("email", "Incorrect email or password")
    .isEmail()
    .normalizeEmail()
    .custom(async function emailCheck(email, { req }) {
      try {
        let user = await User.findOne({ where: { email: email } });
        if (!user) {
          return Promise.reject("Incorrect email or password");
        }

        let hasMatched = await bcrypt.compare(req.body.password, user.password);

        if (!hasMatched) {
          return Promise.reject("Incorrect email or password");
        }

        req.user = user;
      } catch (err) {
        console.log(err);
        return Promise.reject("Operation failed, please try again later");
      }
    }),
];

export default loginCheck;
