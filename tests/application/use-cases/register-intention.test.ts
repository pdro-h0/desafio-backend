import { RegisterIntentionUseCase } from "@/application/use-cases/register-intention";
import { CreateIntention } from "@/domain/contracts/repos";

describe("REGISTER INTENTION", () => {
  let input: CreateIntention.Input;
  let sut: RegisterIntentionUseCase;
  let intentionRepo: jest.Mocked<CreateIntention>;

  beforeAll(() => {
    input = {
      name: "any_name",
      email: "any_email@example.com",
      company: "any_company_name",
      text: "any_text",
    };
    intentionRepo = {
      create: jest.fn(),
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
      company: "any_company_name",
      text: "any_text",
    });
    expect(intentionRepo.create).toHaveBeenCalledTimes(1);
  });
});
