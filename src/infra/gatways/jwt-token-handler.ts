import jwt from "jsonwebtoken";
import { GenerateToken } from "@/domain/contracts/gateways";

export class JwtTokenhandler implements GenerateToken {
  constructor(private readonly secret: string) {}
  async generate(input: GenerateToken.Input): Promise<string> {
    return jwt.sign({ key: input.key }, this.secret, { expiresIn: "1d" });
  }
}
