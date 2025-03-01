"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const room_1 = require("../controller/room");
const router = (0, express_1.default)();
//Create room
router.post("/", [
    (0, express_validator_1.check)("name").notEmpty().withMessage("This is a required field"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required"),
], room_1.createRoom);
//Get All Rooms
router.get("/", room_1.getLatestRooms);
//Get All Rooms
router.get("/:id", room_1.getRoom);
//Enter a room
router.post("/join/:rid", room_1.joinRoom);
//Leave a room
router.post("/leave/:rid", room_1.leaveRoom);
exports.default = router;
