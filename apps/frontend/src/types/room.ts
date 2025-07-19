export type RoomCreatePayload = {
  _id: string;
  name: string;
  password: string;
};

export type RoomJoinPayload = {
  _id: string;
  rid: number;
  userid: number;
};

export type Room = {
  _id: string;
  name: string;
  password: string;
  players: [
    {
      user: {
        _id: "67f1efe24759cdbfc43de2f5";
        nickname: "carol";
        email: "carol@gmail.com";
        createdAt: "2025-04-06T03:07:14.660Z";
        updatedAt: "2025-04-06T03:07:14.660Z";
        __v: 0;
      };
      score: 0;
      owner: true;
      online: true;
      _id: "68048006dfab0d2775d82f0b";
    }
  ];
  createdAt: string;
  updatedAt: string;
};
