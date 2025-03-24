import { RoomCreatePayload } from "../../../packages/shared/src";
import { API_URL } from "./config";

/**
 * Fetching rooms created by user with id
 * @param id
 * @returns List of rooms
 */
export const getMyRooms = async (id: string) => {
  const res = await fetch(`${API_URL}/room/${id}`, {
    method: "GET",
  });

  return res.json();
};

/**
 * Create a room
 * @param payload
 * @returns
 */
export const createRoom = async (payload: RoomCreatePayload) => {
  const res = await fetch(`${API_URL}/room`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  return res.json();
};
