"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
//USER ROUTES
router.use("/user", user_1.default);
//ROOM ROUTES
// router.use("/room", room);
//EMOJIS ROUTES
// router.use("/emojis", emojis);
exports.default = router;
