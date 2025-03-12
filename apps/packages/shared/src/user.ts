export type UserPayload = {
  nickname: string;
  email: string;
  pin: string;
};

export type LoginPayload = {
  authType: string;
  pin: string;
};
