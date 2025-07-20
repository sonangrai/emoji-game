export type TRoomCreatePayload = {
  _id: string;
  name: string;
  password: string;
};

export type TRoomJoinPayload = {
  rid: string;
  pin?: string;
  userid: string;
};

export type TRoom = {
  _id: string;
  name: string;
  password: string;
  players: [
    {
      user: {
        _id: string;
        nickname: string;
        email: string;
        createdAt: string;
        updatedAt: string;
      };
      score: number;
      owner: boolean;
      online: boolean;
      _id: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
};
