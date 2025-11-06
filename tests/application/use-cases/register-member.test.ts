import { RegisterMemberUseCase } from "@/application/use-cases";
import { HashPassword } from "@/domain/contracts/gateways";
import { CreateMember, GetMember } from "@/domain/contracts/repos";

describe("REGISTER MEMBER", () => {
  let input: CreateMember.Input;
  let sut: RegisterMemberUseCase;
  let memberRepo: jest.Mocked<CreateMember & GetMember>;
  let passwordHasher: jest.Mocked<HashPassword>;

  beforeAll(() => {
    input = {
      name: "any_name",
      email: "any_email@example.com",
      password: "any_password",
    };
    memberRepo = {
      create: jest.fn(),
      getByEmail: jest.fn().mockResolvedValue(null),
    };
    passwordHasher = {
      hash: jest.fn().mockResolvedValue("any_password_hash"),
    };
  });

  beforeEach(async () => {
    sut = new RegisterMemberUseCase(memberRepo, passwordHasher);
  });

  it("should call GetMember with correct input", async () => {
    await sut.execute(input);
    expect(memberRepo.getByEmail).toHaveBeenCalledWith({
      email: "any_email@example.com",
    });
    expect(memberRepo.getByEmail).toHaveBeenCalledTimes(1);
  });

  it("Should call HashPassword with correct input", async () => {
    await sut.execute(input);
    expect(passwordHasher.hash).toHaveBeenCalledWith({
      password: "any_password",
    });
    expect(passwordHasher.hash).toHaveBeenCalledTimes(1);
  });

  it("should call CreateMember with correct input", async () => {
    await sut.execute(input);
    expect(memberRepo.create).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@example.com",
      password: "any_password_hash",
    });
    expect(memberRepo.create).toHaveBeenCalledTimes(1);
  });

  it("should throw if GetMember returns a member", async () => {
    memberRepo.getByEmail.mockResolvedValueOnce({
      id: 1,
      name: "any_name",
      email: "any_email@example.com",
      password: "any_password_hash",
      role: "member",
      memberThanks: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(sut.execute(input)).rejects.toThrow();
  });
});
