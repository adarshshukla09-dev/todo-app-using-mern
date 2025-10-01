// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import todoRoutes from "./src/routes/todoRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

await connectDB(); // since "type":"module" top-level await is allowed (Node 14+). If you prefer, call connectDB().catch(...)

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => res.send("ToDo API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
