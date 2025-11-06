import { HashPassword } from "@/domain/contracts/gateways";
import { CreateMember, GetMember } from "@/domain/contracts/repos";
import { UserAlreadyExists } from "@/domain/errors";

export class RegisterMemberUseCase {
  constructor(
    private readonly memberRepo: CreateMember & GetMember,
    private readonly passwordHasher: HashPassword,
  ) {}
  async execute(input: CreateMember.Input): Promise<void> {
    const userWithSameEmail = await this.memberRepo.getByEmail({
      email: input.email,
    });
    if (userWithSameEmail) throw new UserAlreadyExists();
    const passwordHash = await this.passwordHasher.hash({
      password: input.password,
    });
    await this.memberRepo.create({
      ...input,
      password: passwordHash,
    });
  }
}
