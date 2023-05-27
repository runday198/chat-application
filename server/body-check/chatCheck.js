import { body } from "express-validator";

const chatCheck = [
  body("name", "Must be between 3 and 20 characters")
    .trim()
    .isLength({ min: 3, max: 20 }),
];

export default chatCheck;
