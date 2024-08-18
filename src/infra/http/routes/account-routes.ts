import { FastifyInstance } from 'fastify'
import { CreateAccountUseCase } from '../../../use-cases/user/create-account-use-cases'
import { AccountRepositoryMongoose } from '../../database/mongoose/repositories/account-repository-mongoose'


export async function accountRoute (fastify: FastifyInstance) {

  fastify.post<{
    Body: {
    email: string, password: string, passwordConfirmation: string
  }}>('/account', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body
    if(password !=  passwordConfirmation){
      return {
        error: 'Bad Request',
        message: 'password confirmation different from password'
      }
    }
    const accountRepository = new AccountRepositoryMongoose()
    const createAccountUseCase = new CreateAccountUseCase(accountRepository)
    const account = await createAccountUseCase.execute({ email, password })
    res.send({ uuid: account.uuid })
  })

} 