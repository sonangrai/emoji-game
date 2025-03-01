import { API_URL } from "./config";
import { UserPayload } from "../../../packages/shared/src";

export const getUserByNickname = async (nickname: string) => {
  const res = fetch(`${API_URL}/user/${nickname}`, {
    method: "GET",
  });

  return res;
};

export const createUser = async (payload: UserPayload) => {
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
