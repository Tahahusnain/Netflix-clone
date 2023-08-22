import mongoose from "mongoose";
import "dotenv/config";

export const connectMongo = async () => {
  try {
    console.log("Connected to MongoDB");
    await mongoose.connect(process.env.DB, { useNewUrlParser: true });
  } catch (error) {
    console.error(error);
  }
};

// module.exports = connectMongo();
// export default connectMongo;
