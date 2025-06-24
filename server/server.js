import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import userRouter from "./userRouter.js";
import dbConnect from "./dbConnect.js";

const app = express();
dotenv.config();
dbConnect();

// ✅ Enable CORS for frontend (both dev & deployed)
app.use(
  cors({
    origin: ["https://file-share-steel.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);

// ✅ Basic middleware setup
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// ✅ Serve static files from the 'uploads' folder
const __dirname = path.resolve(); // Only needed for ES modules
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API Routes
app.use("/", userRouter);

// ✅ Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
