import { randomUUID } from 'crypto'
import { Replace } from '../utils/replace'
import { Email } from './email'

interface AccountProps {
  uuid: string 
  email: Email
  password: string
}
export class Account {
  private readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  private props: AccountProps
  constructor (props: Replace<AccountProps, { uuid?: string }>) {
    if(!this.passwordRegex.test(props.password)){
      throw new Error('password invalid')
    }
    this.props = {
      uuid: props.uuid ?? randomUUID(),
      email: props.email,
      password: props.password
    }
  }

  get uuid () {
    return this.props.uuid
  }

  get email () {
    return this.props.email
  }

  set email (email: Email) {
    this.props.email = email
  }

  get password () {
    return this.props.password
  }

  set password (password: string) {
    this.props.password = password
  }
}