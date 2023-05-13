import { body } from "express-validator";
import User from "../models/user.js";

const signupCheck = [
  body("email", "Please enter valid email")
    .isEmail()
    .normalizeEmail()
    .custom(async function emailCheck(email) {
      try {
        let user = await User.findOne({ where: { email: email } });

        if (user) {
          return Promise.reject("This email is already in use");
        }
      } catch (err) {
        console.log(err);
        return Promise.reject("Operation failed, please try again later");
      }
    }),
  body("username", "Username must be 6-30 characters long")
    .trim()
    .isLength({ min: 6, max: 30 })
    .custom(async function checkUsername(username) {
      try {
        let user = await User.findOne({ where: { username: username } });

        if (user) {
          return Promise.reject("This username is taken");
        }
      } catch (err) {
        console.log(err);
        return Promise.reject("Operation failed, please try again later");
      }
    }),
  body("password", "Password must be 6-30 characters long")
    .trim()
    .isLength({ min: 5, max: 30 }),
  body("confirmPassword").custom(function confirmPasswordCheck(
    confirmPassword,
    { req }
  ) {
    if (confirmPassword !== req.body.password) {
      return false;
    }
    return true;
  }),
];

export default signupCheck;
