export type Player = {
  online: Boolean;
  score: Number;
  owner: Boolean;
  user: {
    _id: string;
    nickname: string;
    email: string;
  };
};

export type Room = {
  _id: string;
  name: string;
  password: String;
  players: Player[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type RoomCreatePayload = {
  name: string;
  password: string;
  _id: string;
};

export type RoomJoinPayload = {
  rid: string;
  userid: string;
};

export type ChatListType = {
  _id: string;
  text: string;
  user: {
    _id: string;
    nickname: string;
    email: string;
    createdAt: string;
  };
  room: string;
  createdAt: string;
};

export type ChatsResponse = {
  data: ChatListType[];
  status: number;
  message: string;
};

export type MessagePayload = {
  text: string;
  rid: string;
  userid: string;
};
