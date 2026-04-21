import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"

import studentRoutes from "./routes/studentRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import homeworkRoutes from "./routes/homeworkRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/students", studentRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log("Server running")
);
app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use("/api/fees", feeRoutes);

app.use("/api/homework", homeworkRoutes);

app.use("/api/progress", progressRoutes);

app.use("/api/auth", authRoutes);