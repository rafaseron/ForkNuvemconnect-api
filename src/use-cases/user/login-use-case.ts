import { Email } from '../../domain/entities/email'
import { IAccountRepository } from '../../domain/repositories/account-repository'

interface RequestLogin {
  email: string
  password: string
}

export class LoginUseCase {
  constructor (private accountRepository: IAccountRepository) {}

  async execute (request: RequestLogin): Promise<string> {
    const email = new Email(request.email)

    const token = await this.accountRepository.findByEmailPassword(
      email,
      request.password
    )
    if (!token) {
      throw new Error('Invalid email or password')
    }

    return token
  }
}
