import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
  console.log("Attempting to connect to MongoDB...");

  // Retrieve MongoDB URI from environment variables
  const MONGO_URI = process.env.MONGO_URI;

  try {
    // Check if MONGO_URI is defined
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    // Attempt to connect to MongoDB
    const conn = await mongoose.connect(MONGO_URI);

    // Check if connection is successful
    if (!conn) {
      throw new Error("Failed to connect to MongoDB");
    }

    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("Unknown error:", error);
    }
    process.exit(1);
  }
};

export default connectDB;
