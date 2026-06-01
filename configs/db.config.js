import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const instance = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTION ESTABLISHED");
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR: ", error.message);
  }
};

export default connectDB;
