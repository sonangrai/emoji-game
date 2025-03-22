import Router from "express";
import { check } from "express-validator";
import { createRoom, getMyRoom } from "../controller/room";

const router = Router();

//Create room
router.post(
  "/",
  [
    check("_id").notEmpty().withMessage("User ID is required"),
    check("name").notEmpty().withMessage("This is a required field"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  createRoom
);

//Get My Rooms
router.get("/:id", getMyRoom);

export default router;
