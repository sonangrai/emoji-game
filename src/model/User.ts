// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  nickname: string;
  email: string;
}

const UserSchema: Schema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Please provide a Nickname"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    pin: {
      type: String,
      require: [true, "Pin is required"],
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
