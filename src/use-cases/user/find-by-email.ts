import { Account } from '../../domain/entities/account'
import { Email } from '../../domain/entities/email'
import { IAccountRepository } from '../../domain/repositories/account-repository'


export class FindByEmail {
  constructor (private accountRepository: IAccountRepository){}
  
  async execute (email: Email): Promise<Account> {
    const account = await this.accountRepository.findByEmail(email)

    if(!account) {
      throw new Error('Account not found')
    }

    return account
  }
}