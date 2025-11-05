import { FetchIntentionUseCase } from "@/application/use-cases/fetch-intentios";
import { FetchIntention } from "@/domain/contracts/repos";

describe("FETCH INTENTIONS", () => {
  let intentionRepo: jest.Mocked<FetchIntention>;
  let sut: FetchIntentionUseCase;

  beforeAll(() => {
    intentionRepo = {
      fetch: jest.fn(),
    };
  });

  beforeEach(async () => {
    sut = new FetchIntentionUseCase(intentionRepo);
  });

  it("should call FetchIntention", async () => {
    await sut.execute();
    expect(intentionRepo.fetch).toHaveBeenCalledTimes(1);
  });
});
