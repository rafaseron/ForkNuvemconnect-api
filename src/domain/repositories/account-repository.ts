import { Email } from '../entities/email'
import { Account } from '../entities/account'


export interface IAccountRepository {
  save(account: Account): Promise<void>
  findByEmail(email: Email): Promise<Account | null>
}