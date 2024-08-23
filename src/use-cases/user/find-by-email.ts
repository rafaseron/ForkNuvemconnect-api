import { Account } from '../../domain/entities/account'
import { Email } from '../../domain/entities/email'
import { IAccountRepository } from '../../domain/repositories/account-repository'
import { NotFoundError } from '../../domain/utils/error-handle'


export class FindByEmail {
  constructor (private accountRepository: IAccountRepository){}
  
  async execute (email: Email): Promise<Account> {
    const account = await this.accountRepository.findByEmail(email)

    if(!account) {
      throw new NotFoundError('Account not found')
    }

    return account
  }
}