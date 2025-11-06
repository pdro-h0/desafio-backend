import { HashPassword } from "@/domain/contracts/gateways";
import { CreateMember, GetMember } from "@/domain/contracts/repos";

export class RegisterMemberUseCase {
  constructor(
    private readonly memberRepo: CreateMember & GetMember,
    private readonly passwordHasher: HashPassword,
  ) {}
  async execute(input: CreateMember.Input): Promise<void> {
    const userWithSameEmail = await this.memberRepo.getByEmail({
      email: input.email,
    });
    if (userWithSameEmail) throw new Error("User already exists");
    const passwordHash = await this.passwordHasher.hash({
      password: input.password,
    });
    await this.memberRepo.create({
      ...input,
      password: passwordHash,
    });
  }
}
