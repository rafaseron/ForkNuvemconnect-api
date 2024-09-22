import { describe, expect, it } from 'vitest'
import { PasswordResetToken } from './passwordResetToken'

describe('PasswordResetToken entity', () => {
  it('should be able create instance of PasswordResetToken', () => {
    const passwordResetToken = PasswordResetToken.create('john@email.com', '92ch72')

    expect(passwordResetToken).instanceOf(PasswordResetToken)
  })
  it('should throw an error if the token is not exactly 6 characters long and is not alphanumeric', () => {
    expect(() => {
      PasswordResetToken.create('john@email.com', '1e3f5')
    }).toThrowError()

    expect(() => {
      PasswordResetToken.create('john@email.com', '123456')
    }).toThrowError()

    expect(() => {
      PasswordResetToken.create('john@email.com', '12f45s7')
    }).toThrowError()
  })
})
