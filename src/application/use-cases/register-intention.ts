import { CreateIntention } from "@/domain/contracts/repos";

export class RegisterIntentionUseCase {
  constructor(private readonly intentionRepo: CreateIntention) {}
  async execute(input: CreateIntention.Input): Promise<void> {
    await this.intentionRepo.create(input);
  }
}
