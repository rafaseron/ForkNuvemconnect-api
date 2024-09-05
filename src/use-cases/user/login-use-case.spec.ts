import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAccountRepository } from '../../../test/repositories/in-memory-account-repository'
import { LoginUseCase } from './login-use-case'
import { Account } from '../../domain/entities/account'
import { Email } from '../../domain/entities/email'

describe('LoginUseCase', () => {
  let accountRepository: InMemoryAccountRepository
  let loginUseCase: LoginUseCase

  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository()
    loginUseCase = new LoginUseCase(accountRepository)
  })

  it('should return a token if email and password are correct', async () => {
    const email = new Email('test@example.com')
    const password = 'securePassword1!'

    const account = new Account({ email, password })
    await accountRepository.save(account)

    accountRepository.findByEmailPassword = async (
      email: Email,
      password: string
    ) => {
      const account = await accountRepository.findByEmail(email)
      if (account && account.password === password) {
        return 'valid-token'
      }
      return null
    }

    const token = await loginUseCase.execute({ email: email.value, password })
    expect(token).toBe('valid-token')
  })

  it('should throw an error if email or password is incorrect', async () => {
    const email = new Email('test@example.com')
    const password = 'securePassword1!'
    const wrongPassword = 'wrongPassword'

    const account = new Account({ email, password })
    await accountRepository.save(account)

    accountRepository.findByEmailPassword = async (
      email: Email,
      password: string
    ) => {
      const account = await accountRepository.findByEmail(email)
      if (account && account.password === password) {
        return 'valid-token'
      }
      return null
    }

    await expect(
      loginUseCase.execute({ email: email.value, password: wrongPassword })
    ).rejects.toThrowError('Invalid email or password')

    await expect(
      loginUseCase.execute({ email: 'wrong@example.com', password })
    ).rejects.toThrowError('Invalid email or password')
  })

  it('should throw an error if password is empty', async () => {
    const email = new Email('test@example.com')
    const password = 'securePassword1!'
    const account = new Account({ email, password })
    await accountRepository.save(account)

    await expect(
      loginUseCase.execute({ email: email.value, password: '' })
    ).rejects.toThrowError('Invalid email or password')
  })

  it('should throw an error if email is empty', async () => {
    const email = new Email('test@example.com')
    const password = 'securePassword1!'
    const account = new Account({ email, password })
    await accountRepository.save(account)

    await expect(
      loginUseCase.execute({ email: '', password: password })
    ).rejects.toThrowError('Email invalid')
  })
})
