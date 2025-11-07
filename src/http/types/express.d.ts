import "express";

declare module "express" {
  interface Request {
    member?: {
      memberId?: string;
      adminId?: string;
      role: "MEMBER" | "ADMIN";
    };
  }
}
