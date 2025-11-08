import request from "supertest";
import TestAgent from "supertest/lib/agent";
import { app } from "@/app";
import { db } from "@/lib/prisma";

describe("FETCH INTENTION", () => {
  let agent: TestAgent;
  beforeAll(async () => {
    agent = request.agent(app);
    await request(app).post("/members").send({
      name: "admin",
      email: "admin@example.com",
      password: "admin123",
    });
    await db.member.update({
      where: {
        email: "admin@example.com",
      },
      data: {
        role: "ADMIN",
      },
    });
    await agent.post("/sessions").send({
      email: "admin@example.com",
      password: "admin123",
    });
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  it("should fetch intentions successfully", async () => {
    await request(app).post("/applications").send({
      name: "any_name",
      email: "any_email@example.com",
      companyName: "any_company_name",
      text: "any_text",
    });

    const response = await agent.get("/admin/applications").withCredentials();
    expect(response.body).toEqual([
      {
        id: 1,
        name: "any_name",
        email: "any_email@example.com",
        companyName: "any_company_name",
        text: "any_text",
        status: "sent",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });
});
