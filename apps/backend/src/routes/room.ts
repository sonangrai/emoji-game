import Router from "express";
import { check } from "express-validator";
import {
  createRoom,
  getLatestRooms,
  getRoom,
  joinRoom,
  leaveRoom,
} from "../controller/room";

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

//Get All Rooms
router.get("/", getLatestRooms);

//Get All Rooms
router.get("/:id", getRoom);

//Enter a room
router.post("/join/:rid", joinRoom);

//Leave a room
router.post("/leave/:rid", leaveRoom);

export default router;
