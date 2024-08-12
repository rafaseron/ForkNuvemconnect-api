import { describe, expect, it } from 'vitest'
import { User } from './user'
import { Email } from './email'

describe('User entity', () => {
  it('should be able create an instance of User', () => {
    const user = new User({
      email: new Email('fake@email.com'),
      password: 'fake-password'
    })

    expect(user).instanceOf(User)
  })
})