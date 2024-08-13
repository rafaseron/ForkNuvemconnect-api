import { Email } from '../entities/email'
import { User } from '../entities/user'


export interface IUserRepository {
  save(user: User): Promise<void>
  findByEmail(email: Email): Promise<User>
}