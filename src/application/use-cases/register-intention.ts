import { CreateIntention, GetIntention } from "@/domain/contracts/repos";
import { UserAlreadyExists } from "@/domain/errors";

export class RegisterIntentionUseCase {
  constructor(private readonly intentionRepo: CreateIntention & GetIntention) {}
  async execute(input: CreateIntention.Input): Promise<void> {
    const member = await this.intentionRepo.getByEmail({ email: input.email });
    if (member) throw new UserAlreadyExists();
    await this.intentionRepo.create(input);
  }
}
