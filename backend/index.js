// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

import todoRoutes from "./src/routes/todoRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const __dirname = path.resolve();

await connectDB(); // since "type":"module" top-level await is allowed (Node 14+). If you prefer, call connectDB().catch(...)
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      orgin: "http://localhost:5173/",
    })
  );
}
app.use("/api/todos", todoRoutes);
if (process.env.NODE_ENV == "deployment") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.get("/", (req, res) => res.send("ToDo API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
