import { Router } from "express";
import { check } from "express-validator";
import { createUser, getUser } from "../controller/user";

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
  createUser
);

export default router;
