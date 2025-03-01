import { API_URL } from "./config";

export const getUserByNickname = async (nickname: string) => {
  const res = fetch(`${API_URL}/user/${nickname}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export const createUser = async (nickname: string) => {
  const res = fetch(`${API_URL}/user/${nickname}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};
