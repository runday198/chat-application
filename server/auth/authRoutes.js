import express from "express";

import * as authControllers from "./authControllers.js";

import isAuth from "../middleware/isAuth.js";

// check imports
import signupCheck from "../body-check/signupCheck.js";
import loginCheck from "../body-check/loginCheck.js";

const router = express.Router();

router.post("/signup", signupCheck, authControllers.postSignup);

router.post("/login", loginCheck, authControllers.postLogin);

router.post("/check-auth", isAuth, authControllers.postCheckUser);

export default router;
