// test/use-cases/reset-password-use-case.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAccountRepository } from '../../../test/repositories/in-memory-account-repository'
import { resetPasswordUseCase } from '../../use-cases/user/reset-password-use-case'
import { Account } from '../../domain/entities/account'
import { BadRequestError } from '../../domain/utils/error-handle'

describe('Reset Password Use Case', () => {
  let accountRepository: InMemoryAccountRepository
  let resetPassword: resetPasswordUseCase

  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository()
    resetPassword = new resetPasswordUseCase(accountRepository)
  })

  it('should reset the password if the account exists and password is valid', async () => {
    const account = Account.create('Fake Name', 'fake@email.com', 'OldP@ssw0rd')
    accountRepository.accounts.push(account)

    const result = await resetPassword.execute({
      email: 'fake@email.com',
      password: 'NewP@ssw0rd1!'
    })

    expect(result).toBe('Password updated successfully')
    expect(accountRepository.accounts[0].password).toBe('NewP@ssw0rd1!')
  })

  it('should throw an error if the account does not exist', async () => {
    await expect(
      resetPassword.execute({
        email: 'nonexistent@email.com',
        password: 'NewP@ssw0rd1!'
      })
    ).rejects.toThrow(BadRequestError)
  })

  it('should throw an error if the password is invalid', async () => {
    const account = Account.create('Fake Name', 'fake@email.com', 'OldP@ssw0rd')
    accountRepository.accounts.push(account)

    await expect(
      resetPassword.execute({
        email: 'fake@email.com',
        password: 'invalid'
      })
    ).rejects.toThrow(BadRequestError)
  })
})
