import { compare, hash } from "bcryptjs";
import { ComparePassword, HashPassword } from "@/domain/contracts/gateways";

export class BcryptHandler implements HashPassword, ComparePassword {
  async hash(input: HashPassword.Input): Promise<string> {
    return hash(input.password, 6);
  }

  async compare(input: ComparePassword.Input): Promise<boolean> {
    return compare(input.password, input.passwordHashed);
  }
}
