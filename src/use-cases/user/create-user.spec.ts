import { describe, it, expect } from 'vitest'
import { InMemoryUserRepository } from '../../../test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'
import { User } from '../../domain/entities/user'

describe('Create user use case', () => {
  it('should be able create a user', async () => {
    const userRepository = new InMemoryUserRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)
    const user = await createUserUseCase.handle({ email: 'fake@email.com', password: 'f@k3Password' })

    expect(user).toBeInstanceOf(User)
    expect(userRepository.users).toHaveLength(1)
    expect(userRepository.users[0]).toEqual(user)
  })

  it('should to throw error if the email already registered', async () => {
    const userRepository = new InMemoryUserRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)
    await createUserUseCase.handle({ email: 'fake@email.com', password: 'f@k3Password' })

    expect(() => createUserUseCase.handle(
      { email: 'fake@email.com', password: 'f@k3Password' }
    )).rejects.toThrowError()
  })
})