import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../env";

interface JwtPayload {
  memberId?: string;
  adminId?: string;
  role: "ADMIN" | "MEMBER";
}

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers?.authorization;
  const cookiesToken = req.cookies?.token;
  if (authHeader && !authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const token = cookiesToken || authHeader?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    decoded.role === "MEMBER"
      ? (req.member = {
          memberId: decoded.memberId,
          role: decoded.role,
        })
      : (req.member = {
          adminId: decoded.adminId,
          role: decoded.role,
        });
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
