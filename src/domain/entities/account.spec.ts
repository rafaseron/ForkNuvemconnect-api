import { describe, expect, it } from 'vitest'
import { Account } from './account'
import { Email } from './email'

describe('Account entity', () => {
  it('should be able create an instance of Account', () => {
    const account = new Account({
      email: new Email('fake@email.com'),
      password: 'F@k3Password'
    })

    expect(account).instanceOf(Account)
  })
  it('should throw an error for a password without an number', () => {
    expect(
      () => new Account({
        email: new Email('fake@email.com'),
        password: 'f@kePassword'
      })).toThrowError()
  })
  it('should throw an error for a password without a capital letter', () => {
    expect(
      () => new Account({
        email: new Email('fake@email.com'),
        password: 'f@k#password'
      })).toThrowError()
  })
  it('should throw an error for a password without a lower-case letter', () => {
    expect(
      () => new Account({
        email: new Email('fake@email.com'),
        password: 'F@K3PASSWORD'
      })).toThrowError()
  })
  it('should throw an error for passwords without special characters', () => {
    expect(
      () => new Account({
        email: new Email('fake@email.com'),
        password: 'fak3Password'
      })).toThrowError()
  })
})