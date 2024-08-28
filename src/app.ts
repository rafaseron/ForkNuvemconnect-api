import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { accountRoute } from './infra/http/routes/account-routes'

export class App {
  server = fastify({
    logger: false
  })

  constructor () {
    this.plugins()
    this.routes()
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

    this.server.register(swagger, {
      swagger: {
        info: {
          title: 'Nuvem Connect - API',
          description: '',
          version: '0.1.0'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
      }
    })
    this.server.register(swaggerUI, {
      routePrefix: '/docs'
    })
  }
}
