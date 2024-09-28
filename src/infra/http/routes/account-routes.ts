import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { CreateAccountUseCase } from '../../../use-cases/user/create-account-use-cases'
import { AccountRepositoryMongoose } from '../../database/mongoose/repositories/account-repository-mongoose'
import { UnprocessableEntityError } from '../../../domain/utils/error-handle'
import { LoginUseCase } from '../../../use-cases/user/login-use-case'
import { resetPasswordUseCase } from '../../../use-cases/user/reset-password-use-case'
import { RequestPasswordResetUseCase } from '../../../use-cases/user/request-password-reset-use-case'
import { MailtrapSendEmail } from '../../lib/mail-trap-send-email'
import { PasswordResetTokenRepositoryMongoose } from '../../database/mongoose/repositories/password-reset-token-repository-mongoose'

export async function accountRoute (fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/account',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string(),
          passwordConfirmation: z.string()
        })
      }
    },
    async (req, res) => {
      const { name, email, password, passwordConfirmation } = req.body
      if (password != passwordConfirmation) {
        throw new UnprocessableEntityError(
          'password confirmation different from password'
        )
      }
      const accountRepository = new AccountRepositoryMongoose()
      const createAccountUseCase = new CreateAccountUseCase(accountRepository)
      const account = await createAccountUseCase.execute({
        name,
        email,
        password
      })
      res.send({ uuid: account.uuid })
    }
  )

  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/account/login',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string()
        })
      }
    },
    async (req, res) => {
      const { email, password } = req.body
      const accountRepository = new AccountRepositoryMongoose()
      const loginUseCase = new LoginUseCase(accountRepository)
      const token = await loginUseCase.execute({ email, password })
      res.send({ token })
    }
  )

  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/account/request-password-reset',
    {
      schema: {
        body: z.object({
          email: z.string().email()
        })
      }
    },
    async (req, res) => {
      const { email } = req.body

      const passwordResetTokenRepository = new PasswordResetTokenRepositoryMongoose()
      const sendEmail = new MailtrapSendEmail()

      const accountRepository = new AccountRepositoryMongoose()
      const requestPasswordResetUseCase = new RequestPasswordResetUseCase(accountRepository, passwordResetTokenRepository, sendEmail)
      const output = await requestPasswordResetUseCase.execute(email)

      res.status(200).send(output)
    }
  )

  fastify.withTypeProvider<ZodTypeProvider>().put(
    '/account/reset-password',
    {
      schema: {
        body: z.object({
          tokenUUID: z.string().uuid(),
          token: z.string().length(6),
          email: z.string().email(),
          password: z.string(),
          passwordConfirmation: z.string()
        })
      }
    },
    async (req, res) => {
      const { token, tokenUUID, email, password, passwordConfirmation } = req.body
      if (password != passwordConfirmation) {
        throw new UnprocessableEntityError(
          'password confirmation different from password'
        )
      }
      const accountRepository = new AccountRepositoryMongoose()
      const passwordResetTokenRepository = new PasswordResetTokenRepositoryMongoose()
      const resetPassword = new resetPasswordUseCase(passwordResetTokenRepository, accountRepository)
      await resetPassword.execute({ tokenUUID, token, email, password })
      return res.status(200).send()
    }
  )
}
