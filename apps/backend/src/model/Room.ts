import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    players: {
      type: [
        {
          _id: String,
          Nickname: String,
          score: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
