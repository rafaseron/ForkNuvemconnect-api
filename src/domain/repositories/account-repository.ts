import { Email } from '../entities/email'
import { Account } from '../entities/account'

export interface IAccountRepository {
  save(account: Account): Promise<void>
  findByEmail(email: string): Promise<Account | null>
  findByEmailPassword(email: Email, password: string): Promise<string | null>
}
