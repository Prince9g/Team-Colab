import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();
connectDB();

const app = express();

/* =======================
   CORS CONFIG (FINAL)
======================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://taskmanager03.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// app.options("*", cors());

/* =======================
   MIDDLEWARE
======================= */

app.use(express.json());
app.use(cookieParser());

/* =======================
   ROUTES
======================= */

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

/* =======================
   HEALTH CHECK
======================= */

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);
