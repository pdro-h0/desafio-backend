import { RequestHandler } from "express";
import { z } from "zod";
import { RegisterMemberUseCase } from "@/application/use-cases";
import { BcryptHandler } from "@/infra/gatways";
import { PrismaMemberRepository } from "@/infra/repos/prisma";

const registerMemberSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(7),
});

export const registerMember: RequestHandler = async (req, res) => {
  const { name, email, password } = registerMemberSchema.parse(req.body);
  const registerMemberUseCase = new RegisterMemberUseCase(
    new PrismaMemberRepository(),
    new BcryptHandler(),
  );
  await registerMemberUseCase.execute({ name, email, password });
  return res.status(201).send();
};
