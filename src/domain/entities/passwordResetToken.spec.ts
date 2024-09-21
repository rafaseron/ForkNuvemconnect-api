import { describe, expect, it } from 'vitest'
import { PasswordResetToken } from './passwordResetToken'

describe('PasswordResetToken entity', () => {
  it('should be able create instance of PasswordResetToken', () => {
    const passwordResetToken = PasswordResetToken.create('john@email.com', '92ch72')

    expect(passwordResetToken).instanceOf(PasswordResetToken)
  })
  it('should throw error if token then 6 length and non alfa-numeric', () => {
    expect(() => {
      PasswordResetToken.create('john@email.com', '1e3f5')
    }).toThrowError()

    expect(() => {
      PasswordResetToken.create('john@email.com', '123456')
    }).toThrowError()
  })
})
