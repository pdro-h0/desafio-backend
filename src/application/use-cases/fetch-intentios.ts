import { FetchIntention } from "@/domain/contracts/repos";

export class FetchIntentionUseCase {
  constructor(private readonly intentionRepo: FetchIntention) {}

  async execute() {
    return this.intentionRepo.fetch();
  }
}
