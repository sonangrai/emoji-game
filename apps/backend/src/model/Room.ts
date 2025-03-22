import { on } from "events";
import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  score: { type: Number, default: 0 },
  owner: { type: Boolean, default: false },
  online: { type: Boolean, default: false },
});

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    players: {
      type: [playerSchema],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
