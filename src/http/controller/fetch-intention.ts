import { RequestHandler } from "express";
import { FetchIntentionUseCase } from "@/application/use-cases";
import { PrismaIntentionRepository } from "@/infra/repos/prisma";

export const fetchIntention: RequestHandler = async (req, res) => {
  const fetchIntentionUseCase = new FetchIntentionUseCase(
    new PrismaIntentionRepository(),
  );
  const intentions = await fetchIntentionUseCase.execute();
  return res.status(200).send(intentions);
};
