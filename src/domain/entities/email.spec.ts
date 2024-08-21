import { describe, expect, it } from 'vitest'
import { Email } from './email'

describe('Email entity', () => {
  it('should return an instance of Email', () => {
    expect(new Email('fake@email.com')).toBeInstanceOf(Email)
  })
  it('should throw an error for invalid email format', () => {
    expect(() => new Email('fake@.com')).toThrowError()
  })
})