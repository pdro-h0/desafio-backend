import {
  CreateIntention,
  FetchIntention,
  GetIntention,
  ProcessIntention,
} from "@/domain/contracts/repos";
import { Intention } from "@/domain/entities";
import { db } from "@/lib/prisma";

export class PrismaIntentionRepository
  implements CreateIntention, FetchIntention, GetIntention, ProcessIntention
{
  async create(input: CreateIntention.Input): Promise<void> {
    await db.intentionRequest.create({ data: input });
  }
  async fetch(): Promise<Intention[]> {
    return await db.intentionRequest.findMany();
  }
  async getById(input: GetIntention.Input): Promise<Intention | null> {
    return (
      (await db.intentionRequest.findUnique({ where: { id: input.id } })) ??
      null
    );
  }
  async process(input: ProcessIntention.Input): Promise<Intention> {
    return await db.intentionRequest.update({
      where: { id: input.intention.id },
      data: { status: input.status },
    });
  }
}
