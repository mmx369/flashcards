import * as dotenv from 'dotenv'
dotenv.config()

import nodemailer from 'nodemailer'

class MailService {
  constructor() {
    //@ts-ignore
    this.transporter = nodemailer.createTransport({
      //@ts-ignore
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  }

  async sendActivationMail(to: string, link: string) {
    //@ts-ignore
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Account activation ${process.env.API_URL}`,
      text: '',
      html: `
      <div>
      <h1>Activation link</h1>
      <a href="${link}">${link}</a>
      </div>
      `,
    })
  }
}

export default new MailService()
