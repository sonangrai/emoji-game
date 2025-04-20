import Router from "express";
import { check } from "express-validator";
import {
  createRoom,
  getMyRoom,
  getRoomById,
  joinRoom,
  leaveRoom,
} from "../controller/room";
import { getChats, sendMessage } from "../controller/chat";
import validationCheck from "../utils/validation";

const router = Router();

//Create room
router.post(
  "/",
  [
    check("_id").notEmpty().withMessage("User ID is required"),
    check("name").notEmpty().withMessage("This is a required field"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  validationCheck,
  createRoom
);

//Get My Rooms
router.get("/:id", getMyRoom);

// Get room by ID
router.get("/detail/:id", getRoomById);

// Join a room
router.post("/join/:id", [
  check("_id").notEmpty().withMessage("User ID is required"),
  validationCheck,
  joinRoom,
]);

// Leave room
router.post(
  "/leave/:id",
  [check("_id").notEmpty().withMessage("User ID is required")],
  validationCheck,
  leaveRoom
);

// Get chats
router.get("/chats/:roomId", getChats);

// Send message
router.post(
  "/chats/send/:roomId",
  [check("_id").notEmpty().withMessage("User ID is required")],
  validationCheck,
  sendMessage
);

export default router;
