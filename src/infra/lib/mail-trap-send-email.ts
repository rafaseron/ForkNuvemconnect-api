import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { dataType, SendMail } from '../../domain/shared/send-email'

type mailClientType = Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>

export class MailtrapSendEmail implements SendMail{
  private mailClient: mailClientType
  constructor () {
    this.mailClient = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '5be8ee2942115d',
        pass: '854cc7317511f2'
      }
    })
  }
  async handle (data: dataType): Promise<void> {
    try {
      await this.mailClient.sendMail(data)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}