import fastify from 'fastify'
import { accountRoute } from './infra/http/routes/account-routes'

export class App {
  server = fastify({
    logger: false
  })

  constructor () {
    this.routes()
  }

  routes () {
    this.server.get('/hello-world', () => {
      return 'Hello World'
    })
    this.server.register(accountRoute)
  }

}