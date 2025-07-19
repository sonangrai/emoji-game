import { TLoginPayload, TRegisterPayload, TResponse, TUser } from "@/types";
import { API_URL } from "./config";

/**
 *
 * @param nickname
 * @returns Return user nickname
 */
export const getUserByNickname = async (
  nickname: string
): Promise<TResponse<TUser> | Error> => {
  const res = await fetch(`${API_URL}/user/${nickname}`, {
    method: "GET",
  });

  return res.json();
};

/**
 *
 * @param payload
 * @returns New create user
 */
export const createUser = async (
  payload: TRegisterPayload
): Promise<TResponse<TUser> | Error> => {
  const res = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  return res.json();
};

export const loginUser = async (payload: TLoginPayload) => {
  const res = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  return res.json();
};
