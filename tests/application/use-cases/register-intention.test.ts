class RegisterIntentionUseCase {
  constructor(private readonly intentionRepo: CreateIntention) {}
  async execute(input: CreateIntention.Input): Promise<void> {
    await this.intentionRepo.create(input);
  }
}

interface CreateIntention {
  create(input: CreateIntention.Input): Promise<void>;
}

namespace CreateIntention {
  export type Input = {
    name: string;
    email: string;
    company: string;
    text: string;
  };
}

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
