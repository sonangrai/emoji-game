import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Room from "../model/Room";
import ResponseObj from "./response";
import { JOIN_ROOM, LEAVE_ROOM } from "../events/room";
import { getIO } from "../socket";
import User from "../model/User";

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
        user: req.body._id,
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
    const roomItemsLength = await Room.countDocuments({
      "players.user": userId,
      "players.owner": true,
    });

    const room = await Room.find({
      "players.user": userId,
      "players.owner": true,
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
export const getRoomById = async (req: Request, res: Response) => {
  const roomId = req.params.id;
  try {
    const roomInfo = await Room.findById(roomId).populate("players.user", {
      "-pin": true,
    });

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
  } catch (error) {
    const respObject = new ResponseObj(500, {}, "Internal Server Error");
    return res.status(500).send(respObject);
  }
};

/**
 * Join a room
 * @param req
 * @param res
 * @returns
 */
export const joinRoom = async (req: Request, res: Response) => {
  const roomId = req.params.id;
  const id = req.body._id;
  const userData = await User.findById(id);

  try {
    const findUserExist = await Room.findOne({
      _id: roomId,
      $and: [{ "players.user": id }],
    });

    let joinResponse;

    if (findUserExist) {
      joinResponse = await Room.findOneAndUpdate(
        {
          _id: roomId,
          "players.user": id,
        },
        {
          $set: {
            "players.$.online": true,
          },
        },
        { new: true }
      );
    } else {
      joinResponse = await Room.findOneAndUpdate(
        {
          _id: roomId,
          "players.user": id,
        },
        {
          $push: {
            players: {
              _id: id,
              owner: false,
              score: 0,
              online: true,
            },
          },
        },
        { new: true }
      );
    }

    if (joinResponse) {
      const respObject = new ResponseObj(
        200,
        joinResponse,
        "Room joined successfully"
      );

      getIO().emit(JOIN_ROOM, { userId: id, nickname: userData?.nickname });

      return res.status(200).send(respObject);
    }
    const respObject = new ResponseObj(404, {}, "Room not found");
    return res.status(404).send(respObject);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

/**
 * Leave a room
 * @param req
 * @param res
 */
export const leaveRoom = async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const id = req.body._id;

    const leaveResponse = await Room.findOneAndUpdate(
      {
        _id: roomId,
        "players.user": id,
      },
      {
        $set: {
          "players.$.online": false,
        },
      },
      { new: true }
    );
    if (leaveResponse) {
      const respObject = new ResponseObj(
        200,
        leaveResponse,
        "Room left successfully"
      );

      getIO().emit(LEAVE_ROOM, {
        userId: id,
      });

      return res.status(200).send(respObject);
    }
    const respObject = new ResponseObj(404, {}, "Room not found");
    return res.status(404).send(respObject);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
