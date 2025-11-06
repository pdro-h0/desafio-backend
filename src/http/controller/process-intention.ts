import { RequestHandler } from "express";
import { isDate } from "util/types";
import { z } from "zod";
import { ProcessIntentionUseCase } from "@/application/use-cases";
import { env } from "@/env";
import { JwtTokenhandler, NodeMailerHandler } from "@/infra/gatways";
import { PrismaIntentionRepository } from "@/infra/repos/prisma";

const processIntentionSchema = z.object({
  id: z.number(),
  status: z.string(),
});

export const processIntention: RequestHandler = async (req, res) => {
  const { id, status } = processIntentionSchema.parse(req.body);
  const processIntentionUseCase = new ProcessIntentionUseCase(
    new PrismaIntentionRepository(),
    new JwtTokenhandler(env.JWT_SECRET),
    new NodeMailerHandler(),
  );
  await processIntentionUseCase.execute(id, status);
  return res.status(200).send();
};
