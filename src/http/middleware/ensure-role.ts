import { NextFunction, Request, Response } from "express";

export const ensureRole = (...allowedRoles: ("MEMBER" | "ADMIN")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.member) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (!allowedRoles.includes(req.member.role)) {
      res.status(401).json({ message: "Access denied" });
      return;
    }
    next();
  };
};
