"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Room_1 = __importDefault(require("./Room"));
const UserSchema = new mongoose_1.default.Schema({
    Nickname: {
        type: String,
    },
    ActiveRoom: {
        type: Object,
        ref: Room_1.default,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", UserSchema);
