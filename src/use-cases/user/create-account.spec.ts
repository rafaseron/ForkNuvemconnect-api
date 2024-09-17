import { describe, it, expect } from 'vitest'
import { InMemoryAccountRepository } from '../../../test/repositories/in-memory-account-repository'
import { CreateAccountUseCase } from './create-account-use-cases'
import { Account } from '../../domain/entities/account'

describe('Create account use case', () => {
  it('should be able create a account', async () => {
    const accountRepository = new InMemoryAccountRepository()
    const createAccountUseCase = new CreateAccountUseCase(accountRepository)
    const account = await createAccountUseCase.execute({
      name: 'Fake name',
      email: 'fake@email.com',
      password: 'f@k3Password'
    })

    expect(account).toBeInstanceOf(Account)
    expect(accountRepository.accounts).toHaveLength(1)
    expect(accountRepository.accounts[0]).toEqual(account)
  })

  it('should to throw error if the email already registered', async () => {
    const accountRepository = new InMemoryAccountRepository()
    const createAccountUseCase = new CreateAccountUseCase(accountRepository)
    await createAccountUseCase.execute({
      name: 'Fake name',
      email: 'fake@email.com',
      password: 'f@k3Password'
    })

    expect(() =>
      createAccountUseCase.execute({
        name: 'Fake name',
        email: 'fake@email.com',
        password: 'f@k3Password'
      })
    ).rejects.toThrowError()
  })
})
