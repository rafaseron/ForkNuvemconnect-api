import { Account } from '../../../../domain/entities/account'
import { IAccountRepository } from '../../../../domain/repositories/account-repository'
import { hashPassword } from '../../../lib/brcypt'
import { accountModel } from '../model/account-model'


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
  async findByEmail (email: string): Promise<Account | null> {
    const data = await accountModel.findOne({ email })

    if(!data) {
      return null
    }

    const acc = Account.reconstitute(data.uuid, data.email, data.password)

    return acc
  }

}