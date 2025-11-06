import { ComparePassword } from "@/domain/contracts/gateways";
import { AuthenticateMember, GetMember } from "@/domain/contracts/repos";
import { InvalidCredentials } from "@/domain/errors";

export class AuthenticateUseCase {
  constructor(
    private readonly memberRepo: GetMember,
    private readonly passwordHasher: ComparePassword,
  ) {}
  async execute(
    input: AuthenticateMember.Input,
  ): Promise<AuthenticateMember.Output> {
    const member = await this.memberRepo.getByEmail({
      email: input.email,
    });
    if (!member) throw new InvalidCredentials();
    const passwordMatch = await this.passwordHasher.compare({
      password: input.password,
      passwordHashed: member.password,
    });
    if (!passwordMatch) throw new InvalidCredentials();
    return { member };
  }
}
