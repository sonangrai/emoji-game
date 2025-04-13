import { Request, Response } from "express";
import Chat from "../model/Chat";
import ResponseObj from "./response";
import { getIO } from "../socket";
import { CHAT_UPDATED } from "../events/chat";

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
      const resObj = new ResponseObj(200, chats, "Chats fetched");

      return res.status(200).send(resObj);
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

/**
 * Send message
 * @param req
 * @param res
 * @returns
 */
export const sendMessage = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { text } = req.body;
  const userId = req.body._id;

  try {
    const chat = await Chat.create({
      text,
      user: userId,
      room: roomId,
    });

    const response = new ResponseObj(200, chat, "Message sent successfully");

    getIO().emit(CHAT_UPDATED, chat);

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
