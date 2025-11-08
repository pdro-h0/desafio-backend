import request from "supertest";
import TestAgent from "supertest/lib/agent";
import { app } from "@/app";
import { db } from "@/lib/prisma";

describe("PROCESS INTENTION", () => {
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

  it("should process intention successfully", async () => {
    await request(app).post("/applications").send({
      name: "any_name",
      email: "any_email@example.com",
      companyName: "any_company_name",
      text: "any_text",
    });

    await agent
      .put("/admin/applications/status")
      .send({
        id: 1,
        status: "approved",
      })
      .withCredentials()
      .expect(200);

    const response = await agent.get("/admin/applications").withCredentials();

    expect(response.body).toEqual([
      {
        id: 1,
        name: "any_name",
        email: "any_email@example.com",
        companyName: "any_company_name",
        text: "any_text",
        status: "approved",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  }, 6000);

  it("Should return null when id is not found", async () => {
    await agent
      .put("/admin/applications/status")
      .send({
        id: 10,
        status: "approved",
      })
      .withCredentials()
      .expect(404);
  });
});
