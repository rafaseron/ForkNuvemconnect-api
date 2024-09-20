

export interface PasswordResetTokenRepository {
  savePasswordResetToken(uuid: string, token: string, email: string): Promise<void>
  existToken(accountEmail: string): Promise<boolean>
}