import mongoose from "mongoose";

const connectDb = async () => {
  const MONGO_URI = process.env.MONGO_URI!;
  await mongoose.connect(MONGO_URI);
  console.log("Connected to DB");
};

export default connectDb;
