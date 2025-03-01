"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.createUser = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../model/User"));
const response_1 = __importDefault(require("./response"));
/**
 * Create a User
 */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Checking the validation error
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let respObject = new response_1.default(400, errors, "Validation error occurred");
        return res.status(400).send(respObject);
    }
    try {
        let payload = {
            Nickname: req.body.Nickname,
        };
        let newUser = new User_1.default(payload);
        //Check if the nickname already exist
        let found = yield User_1.default.findOne({ Nickname: payload.Nickname });
        if (found) {
            let respObject = new response_1.default(400, {}, "Nickname already Taken");
            return res.status(400).send(respObject);
        }
        yield newUser.save();
        let respObject = new response_1.default(200, newUser, "User created successfully");
        return res.status(200).send(respObject);
    }
    catch (error) {
    }
});
exports.createUser = createUser;
/**
 * Get a user
 */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let nickname = req.params.nickname;
    try {
        let user = yield User_1.default.findOne({ Nickname: nickname });
        if (!user) {
            let respObject = new response_1.default(404, {}, "User not Found");
            return res.status(404).send(respObject);
        }
        let respObject = new response_1.default(200, user, "User found");
        return res.status(200).send(respObject);
    }
    catch (error) {
    }
});
exports.getUser = getUser;
