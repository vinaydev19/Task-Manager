import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

// router import

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

export { app };
