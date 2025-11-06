import nodemailer from "nodemailer";
import { SendEmail } from "@/domain/contracts/gateways";
import { NodeMailerHandler } from "@/infra/gatways";

jest.mock("nodemailer");

describe("NODE MAILER HANDLER", () => {
  let sut: SendEmail;
  let fakeNodemailer: jest.Mocked<typeof nodemailer>;
  let sendMailMock: jest.Mock;
  let input: SendEmail.Input;
  let fakeAccount: any;

  beforeAll(() => {
    sendMailMock = jest.fn();
    fakeNodemailer = nodemailer as jest.Mocked<typeof nodemailer>;
    input = {
      intentionReQuesterEmail: "receiver@mail.com",
      intentionReQuesterName: "any_name",
      token: "any_token",
    };
    fakeAccount = {
      user: "fake_user@ethereal.email",
      pass: "fake_password",
      smtp: {
        host: "smtp.fake.email",
        port: 587,
        secure: false,
      },
    };
  });

  beforeEach(async () => {
    fakeNodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    } as any);
    fakeNodemailer.createTestAccount.mockResolvedValue(fakeAccount);
    sut = new NodeMailerHandler();
  });

  it("Should call sendMail with correct input when token is provided", async () => {
    await sut.send(input);

    expect(sendMailMock).toHaveBeenCalledWith({
      from: "any_company <no-reply@fila.com>",
      to: input.intentionReQuesterEmail,
      subject: "Intenção aceita!",
      html: expect.stringContaining(`Olá ${input.intentionReQuesterName}`),
    });
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  it("Should call sendMail with correct input when token is not provided", async () => {
    await sut.send({
      intentionReQuesterEmail: "receiver@mail.com",
      intentionReQuesterName: "any_name",
    });

    expect(sendMailMock).toHaveBeenCalledWith({
      from: "any_company <no-reply@fila.com>",
      to: "receiver@mail.com",
      subject: "Intenção rejeitada!",
      html: expect.stringContaining(`Olá any_name, infelizmente`),
    });
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  // it("should throw if sendMail throws", async () => {
  //   const error = new Error("Failed to send mail");
  //   sendMailMock.mockRejectedValueOnce(error);

  //   const promise = sut.send({
  //     intentionReQuesterEmail: "receiver@mail.com",
  //     intentionReQuesterName: "any_name",
  //     token: "any_token",
  //   });

  //   await expect(promise).rejects.toThrow(error);
  // });
});
