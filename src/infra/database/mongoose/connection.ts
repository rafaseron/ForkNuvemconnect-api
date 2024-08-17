
import { connect } from 'mongoose'
import 'dotenv/config'


export async function makeConnection () {
  await connect(<string>process.env.CONNECT_STRING_EXTERNAL_MONGODB)
  
}