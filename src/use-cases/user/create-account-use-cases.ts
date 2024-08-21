import { Email } from '../../domain/entities/email'
import { Account } from '../../domain/entities/account'
import { IAccountRepository } from '../../domain/repositories/account-repository'


interface RequestCreateAccount {
  email: string
  password: string
}

export class CreateAccountUseCase {
  constructor (private accountRepository: IAccountRepository) {}

  async execute (request: RequestCreateAccount): Promise<Account> {

    const { password } = request
    const email = new Email(request.email)

    const accountAlreadyExist = await this.accountRepository.findByEmail(email)
    if(accountAlreadyExist) {
      throw new Error('Account already exist')
    }
    const account = new Account({ email, password })
    await this.accountRepository.save(account)

    return account

  }
}