import { API_URL } from "./config";

/**
 * Fetch random emojis
 */
export const getEmoji = async () => {
  const res = await fetch(`${API_URL}/emoji`, {
    method: "GET",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }

  return res.json();
};
