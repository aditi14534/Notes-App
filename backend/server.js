import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.js";
import noteRouter from "./routes/notes.js";

dotenv.config();

const app = express();

//Connect to MongoDB
mongoose
  .connect(process.env.CONNECTION_STR)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://goodnotes-app-frontend.netlify.app",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
