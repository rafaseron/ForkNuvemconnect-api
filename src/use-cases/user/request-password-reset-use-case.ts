import { PasswordResetTokenRepository } from '../../domain/repositories/password-reset-token-repository'
import { nanoid } from 'nanoid'
import { SendMail } from '../../domain/shared/send-email'
import { PasswordResetToken } from '../../domain/entities/passwordResetToken'


export class RequestPasswordResetUseCase {
  constructor (
    private readonly passwordResetToken: PasswordResetTokenRepository,
    private readonly sendEmail: SendMail
  ){}
  async execute (email: string) {
    const tokenAlreadyExists = await this.passwordResetToken.existToken(email)
    if(tokenAlreadyExists) {
      return
    }
    const token = nanoid(6)
    const passwordResetToken = PasswordResetToken.create(email, token)
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
    await this.passwordResetToken.savePasswordResetToken(passwordResetToken)

    return {
      tokenUUID: passwordResetToken.uuid,
      token
    }
  }
}