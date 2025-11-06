import nodemailer, { Transporter } from "nodemailer";
import { SendEmail } from "@/domain/contracts/gateways";
import { env } from "@/env";
import { getMailClient } from "@/lib/mailer";

export class NodeMailerHandler implements SendEmail {
  async send({
    intentionReQuesterEmail,
    intentionReQuesterName,
    token,
  }: SendEmail.Input): Promise<void> {
    const mail = await getMailClient();
    if (token) {
      await this.generateApprovedEmail(
        mail,
        token,
        intentionReQuesterName,
        intentionReQuesterEmail,
      );
    } else {
      await this.generateRejectedEmail(
        mail,
        intentionReQuesterName,
        intentionReQuesterEmail,
      );
    }
  }

  private async generateApprovedEmail(
    mail: Transporter,
    token: string,
    receiverName: string,
    receiverEmail: string,
  ): Promise<void> {
    const message = await mail.sendMail({
      from: "any_company <no-reply@fila.com>",
      to: receiverEmail,
      subject: "Intenção aceita!",
      html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
      <p>Olá ${receiverName}, sua intenção foi aceita!
      </p>
      </div>`.trim(),
    });
    if (env.NODE_ENV !== "test")
      console.log(nodemailer.getTestMessageUrl(message));
  }

  private async generateRejectedEmail(
    mail: Transporter,
    receiverName: string,
    receiverEmail: string,
  ): Promise<void> {
    const message = await mail.sendMail({
      from: "any_company <no-reply@fila.com>",
      to: receiverEmail,
      subject: "Intenção rejeitada!",
      html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
      <p>Olá ${receiverName}, infelizmente sua intenção foi rejeitada!
      </p>
      </div>`.trim(),
    });
    if (env.NODE_ENV !== "test")
      console.log(nodemailer.getTestMessageUrl(message));
  }
}
