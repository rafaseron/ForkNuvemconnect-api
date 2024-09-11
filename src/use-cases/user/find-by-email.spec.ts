import { describe, it, expect } from 'vitest'
import { InMemoryAccountRepository } from '../../../test/repositories/in-memory-account-repository'
import { FindByEmail } from './find-by-email'
import { Email } from '../../domain/entities/email'
import { Account } from '../../domain/entities/account'

describe('Find account by email', () => {
  const accountRepository = new InMemoryAccountRepository()
  accountRepository.accounts.push(Account.create('fake@email.com', 'f@k3Password'))
  const findByEmail = new FindByEmail(accountRepository)
  
  it('should be able find account by email', async () => {
    const email = new Email('fake@email.com')
    const account = await findByEmail.execute(email)

    expect(account).toBeTruthy()
  })
  it('should throw error if account not found by email', async () => { 
    await expect(() => findByEmail.execute(new Email('same@email.com'))).rejects.toThrowError()
  })
})