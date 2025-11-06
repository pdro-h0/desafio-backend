import { RequestHandler } from "express";
import { z } from "zod";
import { RegisterIntentionUseCase } from "@/application/use-cases";
import { PrismaIntentionRepository } from "@/infra/repos/prisma";

const registerIntentionSchema = z.object({
  name: z.string(),
  email: z.email(),
  companyName: z.string(),
  text: z.string(),
});

export const registerIntention: RequestHandler = async (req, res) => {
  const { name, email, companyName, text } = registerIntentionSchema.parse(
    req.body,
  );
  const registerIntentionUseCase = new RegisterIntentionUseCase(
    new PrismaIntentionRepository(),
  );
  await registerIntentionUseCase.execute({ name, email, companyName, text });
  return res.status(201).send();
};
