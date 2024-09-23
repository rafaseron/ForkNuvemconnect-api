import { Account } from '../../domain/entities/account'
import { IAccountRepository } from '../../domain/repositories/account-repository'
import { UnprocessableEntityError } from '../../domain/utils/error-handle'

interface RequestCreateAccount {
  name: string
  email: string
  password: string
}

export class CreateAccountUseCase {
  constructor (private accountRepository: IAccountRepository) {}

  async execute ({
    name,
    email,
    password
  }: RequestCreateAccount): Promise<Account> {
    const accountAlreadyExist = await this.accountRepository.findByEmail(email)
    if (accountAlreadyExist) {
      throw new UnprocessableEntityError('Account already exist')
    }

    const account = Account.create(name, email, password)
    await this.accountRepository.save(account)

    return account
  }
}
