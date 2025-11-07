import express from "express";
import { errorHandler } from "./http/middleware";
import { router } from "./http/route";

export const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);
