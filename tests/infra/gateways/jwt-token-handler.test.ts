import jwt from "jsonwebtoken";
import { JwtTokenhandler } from "@/infra/gatways";

jest.mock("jsonwebtoken");

describe("JWT TOKEN HANDLER", () => {
  let sut: JwtTokenhandler;
  let fakeJwt: jest.Mocked<typeof jwt>;
  let secret: string;
  let token: string;
  let key: string;

  beforeAll(() => {
    secret = "any_secret";
    token = "any_token";
    key = "any_key";
    fakeJwt = jwt as jest.Mocked<typeof jwt>;
  });

  beforeEach(async () => {
    fakeJwt.sign.mockImplementation(() => token);
    sut = new JwtTokenhandler(secret);
  });

  it("Should call sign with correct input", async () => {
    await sut.generate({ key });
    expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, {
      expiresIn: "1d",
    });
    expect(fakeJwt.sign).toHaveBeenCalledTimes(1);
  });

  it("Should return a token", async () => {
    const tokenGenerated = await sut.generate({ key });
    expect(tokenGenerated).toBe(token);
  });
});
