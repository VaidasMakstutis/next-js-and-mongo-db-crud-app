import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection.readyState == 1) {
      console.log("Database is connected!");
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectMongo;
