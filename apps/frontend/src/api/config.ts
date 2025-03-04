export const BASE_URL = `http://localhost:${process.env.PORT || 4000}`;

export const API_URL =
  process.env.NODE_ENV !== "production"
    ? `${BASE_URL}/api`
    : process.env.BASE_URL;
