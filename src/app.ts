import fastify from 'fastify'

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
  }

}