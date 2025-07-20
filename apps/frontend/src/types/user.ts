// Payload type for login
export type TLoginPayload = {
  authType: string;
  pin: string;
};

// Payload type for registering
export type TRegisterPayload = TLoginPayload & {
  nickname: string;
};

export type TUser = {
  nickname: string;
  email: string;
  pin: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
