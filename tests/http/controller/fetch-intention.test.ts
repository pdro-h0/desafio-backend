import request from "supertest";
import { app } from "@/app";

describe("FETCH INTENTION", () => {
  it("should fetch intentions successfully", async () => {
    await request(app).post("/applications").send({
      name: "any_name",
      email: "any_email@example.com",
      companyName: "any_company_name",
      text: "any_text",
    });

    const response = await request(app).get("/admin/applications").expect(200);
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
