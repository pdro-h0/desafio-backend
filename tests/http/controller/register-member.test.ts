import request from "supertest";
import { app } from "@/app";

describe("REGISTER MEMBER", () => {
  it("should register an member successfully", async () => {
    await request(app)
      .post("/members")
      .send({
        name: "any_name",
        email: "any_email@example.com",
        password: "any_password",
      })
      .expect(201);
  });

  it("should not register an member with same email", async () => {
    await request(app).post("/members").send({
      name: "any_name",
      email: "duplicated_email@example.com",
      password: "any_password",
    });

    await request(app)
      .post("/members")
      .send({
        name: "any_name",
        email: "duplicated_email@example.com",
        password: "any_password",
      })
      .expect(409);
  });
});
