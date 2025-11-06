import bcrypt from "bcryptjs";
import { BcryptHandler } from "@/infra/gatways";

jest.mock("bcryptjs");

describe("BCRYPT HANDLER", () => {
  let sut: BcryptHandler;
  let fakeBcrypt: jest.Mocked<typeof bcrypt>;

  beforeAll(() => {
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
  });

  beforeEach(async () => {
    fakeBcrypt.hash.mockImplementation(() => "any_password_hash");
    sut = new BcryptHandler();
  });

  it("Should call hash with correct input", async () => {
    await sut.hash({ password: "any_password" });
    expect(fakeBcrypt.hash).toHaveBeenCalledWith("any_password", 6);
    expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1);
  });

  it("Should return a password hash", async () => {
    const passwordHash = await sut.hash({ password: "any_password" });
    expect(passwordHash).toBe("any_password_hash");
  });
});
