import type { PasswordResetToken } from '../../src/domain/entities/passwordResetToken'
import { PasswordResetTokenRepository } from '../../src/domain/repositories/password-reset-token-repository'



export class InMemoryPasswordResetTokenRepository implements PasswordResetTokenRepository {
  public passwordResetTokens: PasswordResetToken[] = []
  
  async savePasswordResetToken (passwordResetToken: PasswordResetToken): Promise<void> {
    this.passwordResetTokens.push(passwordResetToken)
  }
  async existToken (accountEmail: string): Promise<boolean> {
    return !!this.passwordResetTokens.find((element) => element.email.value === accountEmail)
  }
  async findTokenByUUID (uuid: string): Promise<PasswordResetToken | null> {
    const passwordResetToken = this.passwordResetTokens.find((element) => element.uuid === uuid)
    if(!passwordResetToken) {
      return null
    }

    return passwordResetToken
  }
  
}