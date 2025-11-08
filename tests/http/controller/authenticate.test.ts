import request from "supertest";
import TestAgent from "supertest/lib/agent";
import { app } from "@/app";

describe("AUTHENTICATE", () => {
  let agent: TestAgent;
  beforeAll(async () => {
    agent = request.agent(app);
    await request(app).post("/members").send({
      name: "any_name",
      email: "any_email@example.com",
      password: "any_password",
    });

    await agent
      .post("/sessions")
      .send({
        email: "any_email@example.com",
        password: "any_password",
      })
      .expect(200);
  });

  it("should not authenticate an member with invalid credentials", async () => {
    await request(app).post("/members").send({
      name: "any_name",
      email: "any_email@example.com",
      password: "any_password",
    });

    await request(app)
      .post("/sessions")
      .send({
        email: "any_email@example.com",
        password: "wrong_password",
      })
      .expect(401);
  });
});
