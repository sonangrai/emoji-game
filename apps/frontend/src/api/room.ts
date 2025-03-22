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
