import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, { dbName: "streamify" });
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (error) => {
      console.log("Error conecting to MongoDB" + error);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
};
