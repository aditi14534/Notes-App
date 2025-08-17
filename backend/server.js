import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.js";
import noteRouter from "./routes/notes.js";

dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.CONNECTION_STR)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS FIX
const allowedOrigins = [
  "http://localhost:5173",
  "https://goodnotes-app-frontend.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // agar request server ke andar se aayi hai (jaise Postman ya server-to-server) to origin null hoga
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Preflight ke liye
app.options(
  "*",
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// Error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
