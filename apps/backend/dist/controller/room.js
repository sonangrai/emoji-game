"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.leaveRoom = exports.joinRoom = exports.getRoom = exports.getLatestRooms = exports.createRoom = void 0;
const express_validator_1 = require("express-validator");
const Room_1 = __importDefault(require("../model/Room"));
const response_1 = __importStar(require("./response"));
const __1 = require("..");
const room_1 = require("../events/room");
/**
 * Create a new room
 */
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Checking the validation error
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let respObject = new response_1.default(400, errors, "Validation error occurred");
        return res.status(400).send(respObject);
    }
    let payload = {
        name: req.body.name,
        password: req.body.password,
    };
    let newRoom = new Room_1.default(payload);
    try {
        yield newRoom.save();
        let respObject = new response_1.default(200, newRoom, "Room created successfully");
        __1.io.sockets.emit(room_1.roomAddedEvent, respObject);
        return res.status(200).send(respObject);
    }
    catch (error) {
        (0, response_1.serverError)(error, res);
    }
});
exports.createRoom = createRoom;
/**
 * Get all rooms
 */
const getLatestRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rooms = yield Room_1.default.find()
            .select(["-password"])
            .limit(10)
            .sort({ createdAt: -1 });
        let respObject = new response_1.default(200, rooms, "Rooms fetched successfully");
        return res.status(200).send(respObject);
    }
    catch (error) {
        (0, response_1.serverError)(error, res);
    }
});
exports.getLatestRooms = getLatestRooms;
/**
 * Get room by id
 */
const getRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        let rooms = yield Room_1.default.findById(id)
            .select(["-password"])
            .limit(10)
            .sort({ createdAt: -1 });
        let respObject = new response_1.default(200, rooms, "Room fetched successfully");
        return res.status(200).send(respObject);
    }
    catch (error) {
        (0, response_1.serverError)(error, res);
    }
});
exports.getRoom = getRoom;
/**
 * Join Room
 */
const joinRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.rid; //The room id
    const password = req.body.password;
    //The player object
    const player = {
        _id: req.body._id,
        Nickname: req.body.Nickname,
        score: 0,
    };
    try {
        //Find room
        let room = yield Room_1.default.findOne({ _id: roomId });
        if (!room) {
            let resObj = new response_1.default(404, null, "Room Not Found");
            return res.status(404).send(resObj);
        }
        //Password checking
        if (password !== room.password) {
            let resObj = new response_1.default(401, {}, "Password don't Match");
            return res.status(401).send(resObj);
        }
        let addedUser = yield Room_1.default.findOneAndUpdate({ _id: roomId }, { $push: { players: player } }, { new: true });
        let resObj = new response_1.default(200, addedUser, `${player.Nickname} Joined the Room`);
        //Emitting User joined room event
        __1.io.sockets.emit(room_1.userJoinedEvent, resObj);
        return res.status(200).send(resObj);
    }
    catch (error) {
        (0, response_1.serverError)(error, res);
    }
});
exports.joinRoom = joinRoom;
/**
 * Exit Room
 */
const leaveRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let roomId = req.params.rid; //The room id
    //The player object
    let player = {
        Nickname: req.body.Nickname,
        score: 0,
    };
    try {
        //Find room
        let room = yield Room_1.default.findOne({ _id: roomId });
        if (!room) {
            let resObj = new response_1.default(404, null, "Room Not Found");
            return res.status(404).send(resObj);
        }
        let filterRoom = room.players.filter((el) => el.Nickname !== player.Nickname);
        let addedUser = yield Room_1.default.findOneAndUpdate({ _id: roomId }, { players: filterRoom }, { new: true });
        let resObj = new response_1.default(200, addedUser, `${player.Nickname} left the Room`);
        //Emitting User joined room event
        __1.io.sockets.emit(room_1.userLeaveEvent, resObj);
        return res.status(200).send(resObj);
    }
    catch (error) {
        (0, response_1.serverError)(error, res);
    }
});
exports.leaveRoom = leaveRoom;
