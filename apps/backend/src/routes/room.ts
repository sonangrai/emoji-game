import Router from "express";
import { check } from "express-validator";
import { createRoom, getMyRoom, getRoomById } from "../controller/room";

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

// Get room by ID
router.get("/detail/:id", getRoomById);

export default router;
