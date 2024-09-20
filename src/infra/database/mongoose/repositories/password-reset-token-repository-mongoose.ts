import { PasswordResetTokenRepository } from '../../../../domain/repositories/password-reset-token-repository'
import { PasswordResetTokenModel } from '../model/password-reset-token-model'


export class PasswordResetTokenRepositoryMongoose implements PasswordResetTokenRepository {
  async savePasswordResetToken (uuid: string, token: string, email: string): Promise<void> {
    await PasswordResetTokenModel.create({
      uuid, 
      token,
      email
    })
  }
  async existToken (accountEmail: string): Promise<boolean> {
    const resetToken = await PasswordResetTokenModel.findOne({ email: accountEmail }).lean()
    if(!resetToken){
      return false
    }

    return true
  }
} 