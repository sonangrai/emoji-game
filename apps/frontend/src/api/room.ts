import { API_URL } from "./config";

import {
  TRoomCreatePayload,
  TRoomJoinPayload,
  TRoom,
  TResponse,
} from "@/types";

/**
 * Fetching rooms created by user with id
 * @param id
 * @returns List of rooms
 */
export const getMyRooms = async (id: string): Promise<TResponse<TRoom[]>> => {
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
export const createRoom = async (payload: TRoomCreatePayload) => {
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

/**
 * Get room by ID
 * @param id
 * @returns
 */
export const getRoomById = async (
  id: string
): Promise<
  | (Omit<TResponse, "data"> & {
      data: TRoom;
    })
  | Error
> => {
  const res = await fetch(`${API_URL}/room/detail/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  return res.json();
};

/**
 *
 * @param rid
 * @param userid
 * @returns
 */
export const joinRoom = async (payload: TRoomJoinPayload) => {
  const { rid, pin, userid } = payload;
  const res = await fetch(`${API_URL}/room/join/${rid}`, {
    method: "POST",
    body: JSON.stringify({ _id: userid, pin: pin }),
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

/**
 * Leave room
 * @param rid
 * @param userid
 * @returns
 */
export const leaveRoom = async (payload: TRoomJoinPayload) => {
  const { rid, userid } = payload;
  const res = await fetch(`${API_URL}/room/leave/${rid}`, {
    method: "POST",
    body: JSON.stringify({ _id: userid }),
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
