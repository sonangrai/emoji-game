import mongoose from "mongoose";
import Room from "./Room";

const UserSchema = new mongoose.Schema(
  {
    Nickname: {
      type: String,
    },
    ActiveRoom: {
      type: Object,
      ref: Room,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
