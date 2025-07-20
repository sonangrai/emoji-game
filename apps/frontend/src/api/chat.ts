import { TChatResponse, TMessagePayload } from "@/types/chat";
import { API_URL } from "./config";
import { TResponse } from "@/types";

/**
 * Fetching room chats
 * @param id
 * @returns List of rooms
 */
export const getChats = async (
  id: string
): Promise<TResponse<TChatResponse[]>> => {
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
export const sendMessage = async (payload: TMessagePayload) => {
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
