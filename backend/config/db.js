// backend/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // if (!uri) throw new Error("MONGO_URI not set in .env");
    await mongoose.connect(
      "mongodb+srv://adarshshukla4007_db_user:8q0fIaM2JYfHJBqX@cluster0.pewv7fq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
