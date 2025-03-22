import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Room from "../model/Room";
import ResponseObj from "./response";

/**
 * Create a new room
 */
export const createRoom = async (req: Request, res: Response) => {
  //Checking the validation error
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(400, errors, "Validation error occurred");
    return res.status(400).send(respObject);
  }

  let payload = {
    name: req.body.name,
    password: req.body.password,
    players: [
      {
        _id: req.body._id,
        owner: true,
        score: 0,
      },
    ],
  };

  let newRoom = new Room(payload);

  try {
    await newRoom.save();
    let respObject = new ResponseObj(200, newRoom, "Room created successfully");
    return res.status(200).send(respObject);
  } catch (error) {}
};

/**
 * Get all rooms
 */
export const getLatestRooms = async (req: Request, res: Response) => {
  try {
    let rooms = await Room.find()
      .select(["-password"])
      .limit(10)
      .sort({ createdAt: -1 });
    let respObject = new ResponseObj(200, rooms, "Rooms fetched successfully");
    return res.status(200).send(respObject);
  } catch (error) {}
};

/**
 * Get room by id
 */
export const getRoom = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let rooms = await Room.findById(id)
      .select(["-password"])
      .limit(10)
      .sort({ createdAt: -1 });
    let respObject = new ResponseObj(200, {}, "Room fetched successfully");
    return res.status(200).send(respObject);
  } catch (error) {}
};

/**
 * Join Room
 */
export const joinRoom = async (req: Request, res: Response) => {
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
    let room = await Room.findOne({ _id: roomId });
    if (!room) {
      let resObj = new ResponseObj(404, {}, "Room Not Found");
      return res.status(404).send(resObj);
    }

    //Password checking
    if (password !== room.password) {
      let resObj = new ResponseObj(401, {}, "Password don't Match");
      return res.status(401).send(resObj);
    }

    let addedUser = await Room.findOneAndUpdate(
      { _id: roomId },
      { $push: { players: player } },
      { new: true }
    );
    let resObj = new ResponseObj(200, {}, `${player.Nickname} Joined the Room`);

    return res.status(200).send(resObj);
  } catch (error) {}
};

/**
 * Exit Room
 */
export const leaveRoom = async (req: Request, res: Response) => {};
