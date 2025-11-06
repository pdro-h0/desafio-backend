import request from "supertest";
import { app } from "@/app";

describe("AUTHENTICATE", () => {
  it("should authenticate an member successfully", async () => {
    await request(app).post("/members").send({
      name: "any_name",
      email: "any_email@example.com",
      password: "any_password",
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: "any_email@example.com",
        password: "any_password",
      })
      .expect(200);

    expect(response.body).toEqual({
      token: expect.any(String),
    });
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
