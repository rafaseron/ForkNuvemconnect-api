import { App } from './app'

const server = new App().server

server.listen({ port: 3000 }, (err, address) => {

  if(err) {
    server.log.error(err)
    process.exit(1)
  }

  console.log(`address: ${address}`)

})