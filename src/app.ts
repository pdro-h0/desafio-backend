import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { errorHandler } from "./http/middleware";
import { router } from "./http/route";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(errorHandler);
