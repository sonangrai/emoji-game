import mongoose from "mongoose";

/**
 * Connects to the mongo Database
 */
const connectDb = async () => {
  try {
    let DB_URI: string = process.env.DB!;
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URI);
    console.log("|_____DB connected_____|");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
