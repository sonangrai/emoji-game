import { Router } from "express";
import { check } from "express-validator";
import { createUser, getUser } from "../controller/user";

const router = Router();

//Get user/player
router.get("/:nickname", getUser);

//Add user
router.post(
  "/",
  [check("Nickname").notEmpty().withMessage("Nickname is Required")],
  createUser
);

export default router;
