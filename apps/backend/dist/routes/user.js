"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../controller/user");
const router = (0, express_1.Router)();
//Get user/player
router.get("/:nickname", user_1.getUser);
//Add user
router.post("/", [(0, express_validator_1.check)("Nickname").notEmpty().withMessage("Nickname is Required")], user_1.createUser);
exports.default = router;
