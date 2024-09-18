import { IAccountRepository } from '../../domain/repositories/account-repository'
import { BadRequestError } from '../../domain/utils/error-handle'

interface RequestResetPassword {
  email: string
  password: string
}

export class resetPasswordUseCase {
  constructor (private accountRepository: IAccountRepository) {}

  async execute (request: RequestResetPassword): Promise<string> {
    const email = request.email
    const password = request.password

    const account = await this.accountRepository.findByEmail(email)
    if (!account) {
      throw new BadRequestError('E-mail not found')
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    if (!passwordRegex.test(password)) {
      throw new BadRequestError('Invalid password')
    }

    await this.accountRepository.updatePassword(email, password)

    return 'Password updated successfully'
  }
}
