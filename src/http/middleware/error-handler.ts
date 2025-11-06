import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { IntentioNotFound } from "@/domain/errors";

const errorMap = {
  [IntentioNotFound.name]: 404,
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ error: error.message });
  }
  const statusCode = errorMap[error.constructor.name as keyof typeof errorMap];
  if (statusCode) return res.status(statusCode).json({ error: error.message });
  return res.status(500).json({ error: error.message });
};
