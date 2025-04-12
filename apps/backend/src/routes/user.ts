import { Router } from "express";
import { check } from "express-validator";
import { createUser, getUser, loginUser } from "../controller/user";
import validationCheck from "../utils/validation";

const router = Router();

//Get user/player
router.get("/:nickname", getUser);

//Add user
router.post(
  "/",
  [
    check("nickname").notEmpty().withMessage("Nickname is Required"),
    check("email").notEmpty().withMessage("Email is Required"),
    check("pin").notEmpty().withMessage("PIN is Required"),
  ],
  validationCheck,
  createUser
);

// Login
router.post(
  "/login",
  [
    check("authType").notEmpty().withMessage("Email/Nickname is Required"),
    check("pin").notEmpty().withMessage("PIN is required"),
  ],
  validationCheck,
  loginUser
);

export default router;
