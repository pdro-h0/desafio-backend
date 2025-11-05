import { ProcessIntentionUseCase } from "@/application/use-cases";
import { GenerateToken, SendEmail } from "@/domain/contracts/gateways";
import { GetIntention, ProcessIntention } from "@/domain/contracts/repos";

describe("PROCESS INTENTION", () => {
  let intentionRepo: jest.Mocked<GetIntention & ProcessIntention>;
  let tokenGenerator: jest.Mocked<GenerateToken>;
  let emailSender: jest.Mocked<SendEmail>;
  let sut: ProcessIntentionUseCase;
  let input: { id: number; status: string };

  beforeAll(() => {
    intentionRepo = {
      process: jest.fn(),
      getById: jest.fn().mockResolvedValue({
        id: "any_id",
        name: "any_name",
        email: "any_email",
        company: "any_company",
        text: "any_text",
        status: "sent",
        createdAt: new Date("2025-11-04T23:52:16.166Z"),
        updatedAt: new Date("2025-11-04T23:52:16.166Z"),
      }),
    };
    tokenGenerator = {
      generate: jest.fn().mockResolvedValue("any_token"),
    };
    emailSender = {
      send: jest.fn(),
    };
    input = {
      id: 1,
      status: "approved",
    };
  });

  beforeEach(async () => {
    sut = new ProcessIntentionUseCase(
      intentionRepo,
      tokenGenerator,
      emailSender,
    );
  });

  it("should call GetIntention with correct input", async () => {
    await sut.execute(input.id, input.status);
    expect(intentionRepo.getById).toHaveBeenCalledWith({
      id: 1,
    });
    expect(intentionRepo.getById).toHaveBeenCalledTimes(1);
  });

  it("should call ProcessIntention with correct input", async () => {
    await sut.execute(input.id, input.status);
    expect(intentionRepo.process).toHaveBeenCalledWith({
      intention: {
        id: "any_id",
        name: "any_name",
        email: "any_email",
        company: "any_company",
        text: "any_text",
        status: "sent",
        createdAt: new Date("2025-11-04T23:52:16.166Z"),
        updatedAt: new Date("2025-11-04T23:52:16.166Z"),
      },
      status: "approved",
    });
    expect(intentionRepo.process).toHaveBeenCalledTimes(1);
  });

  it("Should call GenerateToken if ProcessIntention returns true", async () => {
    await sut.execute(input.id, input.status);
    expect(tokenGenerator.generate).toHaveBeenCalledTimes(1);
  });

  it("Should call EmailSender with token if status is approved", async () => {
    await sut.execute(input.id, input.status);
    expect(emailSender.send).toHaveBeenCalledWith({
      intentionReQuesterEmail: "any_email",
      intentionReQuesterName: "any_name",
      token: "any_token",
    });
    expect(emailSender.send).toHaveBeenCalledTimes(1);
  });

  it("Should call EmailSender without token if status is not approved", async () => {
    await sut.execute(input.id, "rejected");
    expect(emailSender.send).toHaveBeenCalledTimes(1);
  });

  it("Should throw error if GetIntention returns null", async () => {
    intentionRepo.getById.mockResolvedValueOnce(null);
    await expect(sut.execute(input.id, input.status)).rejects.toThrow(
      "Intention not found",
    );
  });
});
