export type Player = {
  online: Boolean;
  score: Number;
  owner: Boolean;
  _id: string;
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
