import { randomUUID } from 'node:crypto'
import { PasswordResetTokenRepository } from '../../domain/repositories/password-reset-token-repository'
import { nanoid } from 'nanoid'
import { SendMail } from '../../domain/shared/send-email'


export class RequestPasswordResetUseCase {
  constructor (
    private readonly passwordResetToken: PasswordResetTokenRepository,
    private readonly sendEmail: SendMail
  ){}
  async execute (email: string) {
    const tokenAlreadyExists = await this.passwordResetToken.existToken(email)
    console.log(tokenAlreadyExists)
    if(tokenAlreadyExists) {
      return
    }
    const token = nanoid(6)
    this.sendEmail.handle({
      from: {
        name: 'Team nuvem connect',
        address: 'nuvem.connect@email.com'
      },
      to: email,
      subject: 'Código para alterar senha',
      html: `
        <p> seu código: ${token} </p>
      `
    })
    await this.passwordResetToken.savePasswordResetToken(randomUUID(), token, email)
  }
}