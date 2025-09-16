import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"; 
import redis from "./config/redis.js"; 

dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());

// CORS: allow frontend cookies
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);


app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
