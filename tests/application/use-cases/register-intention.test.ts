import { RegisterIntentionUseCase } from "@/application/use-cases";
import { CreateIntention, GetIntention } from "@/domain/contracts/repos";

describe("REGISTER INTENTION", () => {
  let input: CreateIntention.Input;
  let sut: RegisterIntentionUseCase;
  let intentionRepo: jest.Mocked<CreateIntention & GetIntention>;

  beforeAll(() => {
    input = {
      name: "any_name",
      email: "any_email@example.com",
      companyName: "any_company_name",
      text: "any_text",
    };
    intentionRepo = {
      create: jest.fn(),
      getById: jest.fn(),
      getByEmail: jest.fn(),
    };
  });

  beforeEach(async () => {
    sut = new RegisterIntentionUseCase(intentionRepo);
  });

  it("should call CreateIntention with correct input", async () => {
    await sut.execute(input);
    expect(intentionRepo.create).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@example.com",
      companyName: "any_company_name",
      text: "any_text",
    });
    expect(intentionRepo.create).toHaveBeenCalledTimes(1);
  });

  it("should call GetIntention with correct input", async () => {
    await sut.execute(input);
    expect(intentionRepo.getByEmail).toHaveBeenCalledWith({
      email: "any_email@example.com",
    });
    expect(intentionRepo.getByEmail).toHaveBeenCalledTimes(1);
  });

  it("should throw UserAlreadyExists if email already exists", async () => {
    intentionRepo.getByEmail.mockResolvedValueOnce({
      id: 1,
      name: "any_name",
      email: "any_email@example.com",
      companyName: "any_company_name",
      text: "any_text",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "sent",
    });
    await expect(sut.execute(input)).rejects.toThrow();
  });
});
