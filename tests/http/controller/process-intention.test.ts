import request from "supertest";
import { app } from "@/app";
import { db } from "@/lib/prisma";

describe("PROCESS INTENTION", () => {
  let token: string;

  beforeAll(async () => {
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
    const response = await request(app).post("/sessions").send({
      email: "admin@example.com",
      password: "admin123",
    });
    token = response.body.token;
  });

  it("should process intention successfully", async () => {
    await request(app).post("/applications").send({
      name: "any_name",
      email: "any_email@example.com",
      companyName: "any_company_name",
      text: "any_text",
    });

    await request(app)
      .put("/admin/applications/status")
      .send({
        id: 1,
        status: "approved",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const response = await request(app)
      .get("/admin/applications")
      .set("Authorization", `Bearer ${token}`);

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
    await request(app)
      .put("/admin/applications/status")
      .send({
        id: 10,
        status: "approved",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});
