import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../model/User";
import ResponseObj from "./response";

/**
 * Create a User
 */
export const createUser = async (req: Request, res: Response) => {
  //Checking the validation error
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(400, errors, "Validation error occurred");
    return res.status(400).send(respObject);
  }

  try {
    let payload = {
      Nickname: req.body.Nickname,
    };
    let newUser = new User(payload);

    //Check if the nickname already exist
    let found = await User.findOne({ Nickname: payload.Nickname });
    if (found) {
      let respObject = new ResponseObj(400, {}, "Nickname already Taken");
      return res.status(400).send(respObject);
    }

    await newUser.save();
    let respObject = new ResponseObj(200, newUser, "User created successfully");
    return res.status(200).send(respObject);
  } catch (error) {
    const errorResponse = new ResponseObj(500, {}, "Internal Server Error");
    return res.status(500).send(errorResponse);
  }
};

/**
 * Get a user
 */
export const getUser = async (req: Request, res: Response) => {
  let nickname = req.params.nickname;
  console.log(nickname);
  try {
    let user = await User.findOne({ nickname: nickname });
    if (!user) {
      let respObject = new ResponseObj(404, {}, "User not Found");
      return res.status(404).send(respObject);
    }

    let respObject = new ResponseObj(200, user, "User found");
    return res.status(200).send(respObject);
  } catch (error) {
    const errorResponse = new ResponseObj(500, {}, "Internal Server Error");
    return res.status(500).send(errorResponse);
  }
};
