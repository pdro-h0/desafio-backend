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
    fakeBcrypt.compare.mockImplementation(() => true);
    sut = new BcryptHandler();
  });

  describe("HASH", () => {
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

  describe("COMPARE", () => {
    it("Should call compare with correct input", async () => {
      await sut.compare({
        password: "any_password",
        passwordHashed: "any_password_hash",
      });
      expect(fakeBcrypt.compare).toHaveBeenCalledWith(
        "any_password",
        "any_password_hash",
      );
      expect(fakeBcrypt.compare).toHaveBeenCalledTimes(1);
    });

    it("Should return a boolean", async () => {
      const result = await sut.compare({
        password: "any_password",
        passwordHashed: "any_password_hash",
      });
      expect(result).toBe(true);
    });
  });
});
