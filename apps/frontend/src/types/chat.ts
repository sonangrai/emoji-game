export type TChatResponse = {
  _id: string;
  text: string;
  user: {
    _id: string;
    nickname: string;
    email: string;
    pin: string;
    createdAt: string;
    updatedAt: string;
  };
  room: string;
  createdAt: string;
  updatedAt: string;
};

export type TMessagePayload = {
  text: string;
  rid: string;
  userid: string;
};
