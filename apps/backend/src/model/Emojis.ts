import mongoose from "mongoose";

const EmojiSchema = new mongoose.Schema(
  {
    emojis: {
      type: String,
    },
    answer: {
      type: String,
    },
    hints: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Emoji", EmojiSchema);
