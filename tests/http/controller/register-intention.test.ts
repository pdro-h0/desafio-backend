import request from "supertest";
import { app } from "@/app";

describe("REGISTER INTENTION", () => {
  it("should register an intention successfully", async () => {
    await request(app)
      .post("/applications")
      .send({
        name: "any_name",
        email: "any_email@example.com",
        companyName: "any_company_name",
        text: "any_text",
      })
      .expect(201);
  });
});
