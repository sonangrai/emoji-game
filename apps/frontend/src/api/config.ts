export const BASE_URL = `http://localhost:${process.env.PORT || 4000}`;

export const API_URL =
  process.env.NODE_ENV !== "production" ? `${BASE_URL}/api` : "/api";

export const SOCKET_URL =
  process.env.NODE_ENV !== "production" ? BASE_URL : "/";
