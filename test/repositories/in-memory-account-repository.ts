import { Email } from '../../src/domain/entities/email'
import { Account } from '../../src/domain/entities/account'
import { IAccountRepository } from '../../src/domain/repositories/account-repository'



export class InMemoryAccountRepository implements IAccountRepository {
  public accounts: Account[] = []
  async save (account: Account): Promise<void> {
    this.accounts.push(account)
  }
  async findByEmail (email: Email): Promise<Account | null> {
    const account = this.accounts.find(account => account.email.value === email.value)

    if(!account) {
      return null
    }

    return account
  }

}