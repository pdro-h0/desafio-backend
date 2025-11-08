import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { AuthenticateUseCase } from "@/application/use-cases";
import { env } from "@/env";
import { BcryptHandler } from "@/infra/gatways";
import { PrismaMemberRepository } from "@/infra/repos/prisma";

const authenticateSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const authenticateMember: RequestHandler = async (req, res) => {
  const { email, password } = authenticateSchema.parse(req.body);
  const authenticateUseCase = new AuthenticateUseCase(
    new PrismaMemberRepository(),
    new BcryptHandler()
  );
  const { member } = await authenticateUseCase.execute({ email, password });
  const payload = {
    memberId: member.id,
    role: member.role,
  };
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return res
    .status(200)
    .cookie("token", token, {
      path: "/",
      secure: false,
      sameSite: "lax",
      httpOnly: true,
    })
    .end();
};
