import { describe, expect, it } from 'vitest'
import { User } from './user'
import { Email } from './email'

describe('User entity', () => {
  it('should be able create an instance of User', () => {
    const user = new User({
      email: new Email('fake@email.com'),
      password: 'F@k3Password'
    })

    expect(user).instanceOf(User)
  })
  it('should throw an error for a password without an number', () => {
    expect(
      () => new User({
        email: new Email('fake@email.com'),
        password: 'f@kePassword'
      })).toThrowError()
  })
  it('should throw an error for a password without a capital letter', () => {
    expect(
      () => new User({
        email: new Email('fake@email.com'),
        password: 'f@k#password'
      })).toThrowError()
  })
  it('should throw an error for a password without a lower-case letter', () => {
    expect(
      () => new User({
        email: new Email('fake@email.com'),
        password: 'F@K3PASSWORD'
      })).toThrowError()
  })
  it('should throw an error for passwords without special characters', () => {
    expect(
      () => new User({
        email: new Email('fake@email.com'),
        password: 'fak3Password'
      })).toThrowError()
  })
})