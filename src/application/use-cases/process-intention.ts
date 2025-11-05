import { GenerateToken, SendEmail } from "@/domain/contracts/gateways";
import { GetIntention, ProcessIntention } from "@/domain/contracts/repos";

export class ProcessIntentionUseCase {
  constructor(
    private readonly intentionRepo: GetIntention & ProcessIntention,
    private readonly tokenGenerator: GenerateToken,
    private readonly emailSender: SendEmail,
  ) {}

  async execute(id: number, status: string) {
    const intention = await this.intentionRepo.getById({ id });
    if (!intention) throw new Error("Intention not found");
    await this.intentionRepo.process({ intention, status });
    if (status !== "approved") {
      await this.emailSender.send({
        intentionReQuesterEmail: intention.email,
        intentionReQuesterName: intention.name,
      });
    } else {
      const token = await this.tokenGenerator.generate({
        key: intention.email,
      });
      await this.emailSender.send({
        token,
        intentionReQuesterEmail: intention.email,
        intentionReQuesterName: intention.name,
      });
    }
  }
}
