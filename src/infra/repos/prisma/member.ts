import { CreateMember, GetMember } from "@/domain/contracts/repos";
import { Member } from "@/domain/entities";
import { db } from "@/lib/prisma";

export class PrismaMemberRepository implements GetMember, CreateMember {
  async create(input: CreateMember.Input): Promise<void> {
    await db.member.create({ data: input });
  }
  async getByEmail(input: GetMember.Input): Promise<Member | null> {
    return await db.member.findUnique({ where: { email: input.email } });
  }
}
