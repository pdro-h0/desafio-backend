import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  MEMBER_SECRET: z.string(),
});
export const env = envSchema.parse(process.env);
