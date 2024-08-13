import { Email } from '../../src/domain/entities/email'
import { User } from '../../src/domain/entities/user'
import { IUserRepository } from '../../src/domain/repositories/user-repository'



export class InMemoryUserRepository implements IUserRepository{
  public users: User[] = []
  async save (user: User): Promise<void> {
    this.users.push(user)
  }
  async findByEmail (email: Email): Promise<User | null> {
    const user = this.users.find(user => user.email.value === email.value)

    if(!user) {
      return null
    }

    return user
  }

}