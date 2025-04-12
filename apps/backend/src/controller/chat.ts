import { Request, Response } from "express";
import Chat from "../model/Chat";

/**
 * Fetch all chats for a room by id
 * @param req
 * @param res
 * @returns
 */
export const getChats = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  try {
    const chats = await Chat.find({ room: roomId }).populate("user");

    if (chats.length > 0) {
      return res.status(200).send({
        status: 200,
        message: "Chats fetched successfully",
        data: chats,
      });
    }

    return res.status(404).send({
      status: 404,
      message: "No chats found",
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
