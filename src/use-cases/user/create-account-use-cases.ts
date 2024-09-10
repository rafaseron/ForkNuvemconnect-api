import { Account } from '../../domain/entities/account'
import { IAccountRepository } from '../../domain/repositories/account-repository'
import { BadRequestError } from '../../domain/utils/error-handle'


interface RequestCreateAccount {
  email: string
  password: string
}

export class CreateAccountUseCase {
  constructor (private accountRepository: IAccountRepository) {}

  async execute ({ email, password }: RequestCreateAccount): Promise<Account> {
    
    const accountAlreadyExist = await this.accountRepository.findByEmail(email)
    if(accountAlreadyExist) {
      throw new BadRequestError('Account already exist')
    }
    
    const account = Account.create(email, password)
    await this.accountRepository.save(account)

    return account

  }
}