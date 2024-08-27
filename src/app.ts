import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { accountRoute } from './infra/http/routes/account-routes'
import { errorHandler } from './infra/http/error-handle.ts/error-handle'

export class App {
  server = fastify({
    logger: false
  })

  constructor () {
    this.routes()
    this.plugins()

  }

  routes () {
    this.server.get('/hello-world', () => {
      return 'Hello World'
    })
    this.server.register(accountRoute)
  }
  plugins () {
    this.server.setSerializerCompiler(serializerCompiler)
    this.server.setValidatorCompiler(validatorCompiler)
    this.server.setErrorHandler(errorHandler)
  }

}