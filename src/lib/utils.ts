import mongoose, { ConnectOptions } from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }

    const dbUrl = process.env.MONGO_URL;
    if (!dbUrl) {
      throw new Error("MONGO_URL environment variable is not defined");
    }

    console.log(`Connecting to database with URL: ${dbUrl}`);
    const db = await mongoose.connect(dbUrl, {} as ConnectOptions);

    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};
