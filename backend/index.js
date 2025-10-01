import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

import todoRoutes from "./src/routes/todoRoutes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());

// CORS setup
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" })); // dev frontend
} else {
  app.use(cors()); // optional: restrict to your deployed frontend domain
}

// Connect to MongoDB
try {
  await connectDB();
  console.log("MongoDB connected");
} catch (error) {
  console.error("DB connection failed:", error);
  process.exit(1);
}

// API routes
app.use("/api/todos", todoRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Catch-all for SPA routing
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
  );
}

// Root route
app.get("/", (req, res) => res.send("ToDo API is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
