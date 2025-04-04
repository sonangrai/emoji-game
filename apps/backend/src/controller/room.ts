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
        online: true,
      },
    ],
  };

  let newRoom = new Room(payload);

  try {
    await newRoom.save();
    let respObject = new ResponseObj(200, newRoom, "Room created successfully");
    return res.status(200).send(respObject);
  } catch (error) {
    let respObject = new ResponseObj(500, {}, "Internal Server Error");
    return res.status(500).send(respObject);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const getMyRoom = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;

  try {
    const roomItemsLength = await Room.countDocuments();

    const room = await Room.find({
      "players._id": userId,
    })
      .limit(limit)
      .skip(offset);

    if (room) {
      let respObject = new ResponseObj(200, room, "Room fetched successfully");
      respObject.setMeta(roomItemsLength, offset, limit);
      return res.status(200).send(respObject);
    }

    let respObject = new ResponseObj(404, {}, "Room not found");
    return res.status(404).send(respObject);
  } catch (error) {}
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const getRoomById = async (req: Request, res: Response) => {
  const roomId = req.params.id;
  try {
    const roomInfo = await Room.findById(roomId);
    if (roomInfo) {
      const respObject = new ResponseObj(
        200,
        roomInfo,
        "Room fetched successfully"
      );
      return res.status(200).send(respObject);
    }

    const respObject = new ResponseObj(404, {}, "Room not found");
    return res.status(404).send(respObject);
  } catch (error) {}
};
