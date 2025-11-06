import express from "express";
import { router } from "./http/route";

export const app = express();

app.use(express.json());
app.use(router);
