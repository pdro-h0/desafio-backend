import { hash } from "bcryptjs";
import { HashPassword } from "@/domain/contracts/gateways";

export class BcryptHandler implements HashPassword {
  async hash(input: HashPassword.Input): Promise<string> {
    return hash(input.password, 6);
  }
}
