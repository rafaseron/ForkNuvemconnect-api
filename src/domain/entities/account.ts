import { randomUUID } from 'crypto'
import { Replace } from '../utils/replace'
import { Email } from './email'
import { BadRequestError } from '../utils/error-handle'

export interface AccountProps {
  uuid: string 
  email: Email
  password: string
}
export class Account {
  private props: AccountProps
  constructor (props: Replace<AccountProps, { uuid?: string }>) {
    this.props = {
      uuid: props.uuid ?? randomUUID(),
      email: props.email,
      password: props.password
    }
  }

  public static create (email: string, password: string): Account {
    if(!this.isValidPassword(password)) throw new BadRequestError('Password does not meet the required criteria')
    return new Account({ email: new Email(email), password })
  }

  public static reconstitute (uuid: string, email: string, password: string) {
    return new Account({ uuid, email: new Email(email), password })
  }

  private static isValidPassword (password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    return passwordRegex.test(password)
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
    if(!Account.isValidPassword(password)) throw new BadRequestError('Password does not meet the required criteria')
    this.props.password = password
  }
}