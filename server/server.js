import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import userRouter from "./userRouter.js";
import dbConnect from "./dbConnect.js";

const app = express();
dotenv.config();
dbConnect()
app.use(
  cors({
    origin: ["https://file-share-steel.vercel.app"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit:  "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.resolve() + "/public"));
app.use("/", userRouter);
app.listen(5000, () => {
  console.log("Running on 5000");
});
