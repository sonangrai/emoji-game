"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EmojiSchema = new mongoose_1.default.Schema({
    emojis: {
        type: String,
    },
    answer: {
        type: String,
    },
    hints: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Emoji", EmojiSchema);
