import { Email } from '../../domain/entities/email'
import { User } from '../../domain/entities/user'
import { IUserRepository } from '../../domain/repositories/user-repository'


interface RequestCreateUser {
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor (private userRepository: IUserRepository) {}

  async handle (request: RequestCreateUser): Promise<User> {

    const { password } = request
    const email = new Email(request.email)

    const userAlreadyExist = await this.userRepository.findByEmail(email)
    if(userAlreadyExist) {
      throw new Error('User already exist')
    }
    const user = new User({ email, password })
    await this.userRepository.save(user)

    return user

  }
}