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
exports.addEmojis = exports.getEmojis = exports.getAllEmojis = void 0;
const Emojis_1 = __importDefault(require("../model/Emojis"));
const response_1 = __importStar(require("./response"));
const express_validator_1 = require("express-validator");
/**
 * Getting Emojis Sets
 */
const getAllEmojis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 10;
    try {
        let emojis = yield Emojis_1.default.find()
            .skip(offset)
            .limit(limit)
            .sort({ createdAt: -1 });
        let total = yield Emojis_1.default.countDocuments();
        const resObj = new response_1.default(200, emojis, "Emojis fetched");
        resObj.setMeta(total, offset, limit);
        return res.status(200).send(resObj);
    }
    catch (error) {
        (0, response_1.serverError)(error, res);
    }
});
exports.getAllEmojis = getAllEmojis;
/**
 * Getting Random Emojis Sets
 */
const getEmojis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let emojis = yield Emojis_1.default.aggregate([{ $sample: { size: 10 } }]);
        let response = new response_1.default(200, emojis, "Emojis Collection Fetched");
        return res.send(response);
    }
    catch (error) {
        (0, response_1.serverError)(error, res);
    }
});
exports.getEmojis = getEmojis;
/**
 * Posting the Question of Emoji
 */
const addEmojis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Checking the validation error
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let respObject = new response_1.default(400, errors, "Validation error occur");
        return res.status(400).send(respObject);
    }
    try {
        const payload = {
            emojis: req.body.emojis,
            answer: req.body.answer,
            hints: req.body.hints,
        };
        let newEmojis = new Emojis_1.default(payload);
        //Saving
        yield newEmojis.save();
        const resObj = new response_1.default(200, newEmojis, "New Emojis Record Added");
        return res.status(200).send(resObj);
    }
    catch (error) {
        (0, response_1.serverError)(error, res);
    }
});
exports.addEmojis = addEmojis;
