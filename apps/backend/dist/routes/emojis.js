"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../controller/emojis");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.default)();
// GET the emojis Questions
router.get("/", emojis_1.getEmojis);
// GET all emojis Questions
router.get("/all/", emojis_1.getAllEmojis);
// POST the emojis
router.post("/", [
    (0, express_validator_1.check)("emojis").notEmpty().withMessage("Emojis are required field"),
    (0, express_validator_1.check)("answer").notEmpty().withMessage("Answer is required"),
    (0, express_validator_1.check)("hints").notEmpty().withMessage("Hints is required"),
], emojis_1.addEmojis);
exports.default = router;
