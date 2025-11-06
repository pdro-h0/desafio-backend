import request from "supertest";
import { app } from "@/app";

describe("PROCESS INTENTION", () => {
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
      .expect(200);

    const response = await request(app).get("/admin/applications");
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
      .expect(404);
  });
});
