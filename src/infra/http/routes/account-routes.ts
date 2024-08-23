import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { CreateAccountUseCase } from '../../../use-cases/user/create-account-use-cases'
import { AccountRepositoryMongoose } from '../../database/mongoose/repositories/account-repository-mongoose'
import { BadRequestError } from '../../../domain/utils/error-handle'


export async function accountRoute (fastify: FastifyInstance) {

  fastify.withTypeProvider<ZodTypeProvider>().post('/account', 
    { schema: {
      body: z.object({
        email: z.string().email(),
        password: z.string(),
        passwordConfirmation: z.string()
      })
    } }, 
    async (req, res) => {
      const { email, password, passwordConfirmation } = req.body
      if(password !=  passwordConfirmation){
        throw new BadRequestError('password confirmation different from password')
      }
      const accountRepository = new AccountRepositoryMongoose()
      const createAccountUseCase = new CreateAccountUseCase(accountRepository)
      const account = await createAccountUseCase.execute({ email, password })
      res.send({ uuid: account.uuid })
    })

} 