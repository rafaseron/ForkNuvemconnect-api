import { App } from './app'
import { makeConnection } from './infra/database/mongoose/connection'
const server = new App().server

makeConnection()
  .then(() => {
    server.listen({ port: 3000 }, (err, address) => {
    
      if(err) {
        server.log.error(err)
        process.exit(1)
      }
    
      console.log(`address: ${address}`)
    
    })
  }).catch(err => {
    console.log(err)
  })
  