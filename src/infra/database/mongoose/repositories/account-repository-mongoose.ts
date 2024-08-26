import { Account } from '../../../../domain/entities/account'
import { Email } from '../../../../domain/entities/email'
import { IAccountRepository } from '../../../../domain/repositories/account-repository'
import { hashPassword, comparePassword } from '../../../lib/brcypt'
import { generateToken } from '../../../lib/jwt'
import { accountModel } from '../model/account-model'

interface TokenPayload {
  uuid: string
  email: string
}

export class AccountRepositoryMongoose implements IAccountRepository {
  async save (account: Account): Promise<void> {
    const hashedPassword = hashPassword(account.password)
    const acc = new accountModel({
      uuid: account.uuid,
      email: account.email.value,
      password: hashedPassword
    })
    acc.save()
  }
  async findByEmail (email: Email): Promise<Account | null> {
    const data = await accountModel.findOne({ email: email.value })

    if (!data) {
      return null
    }

    const acc = new Account({
      uuid: data.uuid,
      email: new Email(data.email),
      password: data.password
    })

    return acc
  }

  async findByEmailPassword (
    email: Email,
    password: string
  ): Promise<string | null> {
    const data = await accountModel.findOne({ email: email.value })

    if (!data) {
      return null
    }

    const isPasswordValid = await comparePassword(password, data.password)
    if (!isPasswordValid) {
      return null
    }

    const tokenPayload: TokenPayload = {
      uuid: data.uuid,
      email: data.email
    }

    const token = await generateToken(tokenPayload)
    if (!token) {
      return null
    }

    return token
  }
}
