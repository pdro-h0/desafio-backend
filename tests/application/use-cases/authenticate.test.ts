import { AuthenticateUseCase } from "@/application/use-cases";
import { ComparePassword } from "@/domain/contracts/gateways";
import { AuthenticateMember, GetMember } from "@/domain/contracts/repos";

describe("AUTHENTICATE", () => {
  let input: AuthenticateMember.Input;
  let sut: AuthenticateUseCase;
  let memberRepo: jest.Mocked<AuthenticateMember & GetMember>;
  let passwordHasher: jest.Mocked<ComparePassword>;

  beforeAll(() => {
    input = {
      email: "any_email@example.com",
      password: "any_password",
    };
    memberRepo = {
      authenticate: jest.fn(),
      getByEmail: jest.fn().mockResolvedValue({
        id: 1,
        name: "any_name",
        email: "any_email@example.com",
        password: "any_password_hash",
        role: "member",
        memberThanks: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };
    passwordHasher = {
      compare: jest.fn().mockResolvedValue(true),
    };
  });

  beforeEach(async () => {
    sut = new AuthenticateUseCase(memberRepo, passwordHasher);
  });

  it("should call GetMember with correct input", async () => {
    await sut.execute(input);
    expect(memberRepo.getByEmail).toHaveBeenCalledWith({
      email: "any_email@example.com",
    });
    expect(memberRepo.getByEmail).toHaveBeenCalledTimes(1);
  });

  it("Should call ComparePassword with correct input", async () => {
    await sut.execute(input);
    expect(passwordHasher.compare).toHaveBeenCalledWith({
      password: "any_password",
      passwordHashed: "any_password_hash",
    });
    expect(passwordHasher.compare).toHaveBeenCalledTimes(1);
  });

  it("Should return member if authentication is successful", async () => {
    const result = await sut.execute(input);
    expect(result).toEqual({
      member: {
        id: 1,
        name: "any_name",
        email: "any_email@example.com",
        password: "any_password_hash",
        role: "member",
        memberThanks: 0,
        isActive: true,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    });
  });

  it("should throw if GetMember returns null", async () => {
    memberRepo.getByEmail.mockResolvedValueOnce(null);
    expect(sut.execute(input)).rejects.toThrow();
  });

  it("should throw if ComparePassword returns false", async () => {
    passwordHasher.compare.mockResolvedValueOnce(false);
    expect(sut.execute(input)).rejects.toThrow();
  });
});
