import Emojis from "../model/Emojis";
import ResponseObj, { serverError } from "./response";
import { validationResult } from "express-validator";

/**
 * Getting Emojis Sets
 */
export const getAllEmojis = async (req, res) => {
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 10;

  try {
    let emojis = await Emojis.find()
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });
    let total = await Emojis.countDocuments();

    const resObj = new ResponseObj(200, emojis, "Emojis fetched");
    resObj.setMeta(total, offset, limit);
    return res.status(200).send(resObj);
  } catch (error) {
    serverError(error, res);
  }
};

/**
 * Getting Random Emojis Sets
 */
export const getEmojis = async (req, res) => {
  try {
    let emojis = await Emojis.aggregate([{ $sample: { size: 10 } }]);
    let response = new ResponseObj(200, emojis, "Emojis Collection Fetched");
    return res.send(response);
  } catch (error) {
    serverError(error, res);
  }
};

/**
 * Posting the Question of Emoji
 */
export const addEmojis = async (req, res) => {
  //Checking the validation error
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(400, errors, "Validation error occur");
    return res.status(400).send(respObject);
  }

  try {
    const payload = {
      emojis: req.body.emojis,
      answer: req.body.answer,
      hints: req.body.hints,
    };

    let newEmojis = new Emojis(payload);

    //Saving
    await newEmojis.save();
    const resObj = new ResponseObj(200, newEmojis, "New Emojis Record Added");
    return res.status(200).send(resObj);
  } catch (error) {
    serverError(error, res);
  }
};
