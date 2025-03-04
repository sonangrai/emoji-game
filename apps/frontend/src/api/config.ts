export const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? `http://localhost:${process.env.PORT || 4000}`
    : process.env.BASE_URL;
export const API_URL = `${BASE_URL}/api`;
