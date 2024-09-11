import { connect } from 'mongoose'
import 'dotenv/config'


export async function makeConnection () {
  if(process.env.NODE_ENV === 'production'){
    await connect(<string>process.env.CONNECT_STRING_INTERNAL_MONGODB)
  } else {
    await connect(<string>process.env.CONNECT_STRING_EXTERNAL_MONGODB)
  }
}