import { text } from "stream/consumers";
import { ChatsResponse, MessagePayload } from "../../../packages/shared/src";
import { API_URL } from "./config";

/**
 * Fetching room chats
 * @param id
 * @returns List of rooms
 */
export const getChats = async (id: string): Promise<ChatsResponse> => {
  const res = await fetch(`${API_URL}/room/chats/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  return res.json();
};

/**
 * Send a message
 * @param payload
 * @returns
 */
export const sendMessage = async (payload: MessagePayload) => {
  const res = await fetch(`${API_URL}/room/chats/send/${payload.rid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: payload.text, _id: payload.userid }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  return res.json();
};
