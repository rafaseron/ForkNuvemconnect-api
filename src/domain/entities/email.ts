export class Email {
  private readonly email: string
   
  private readonly emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  constructor (email: string) {
    if(!this.emailRegex.test(email)){
      throw new Error('Email invalid')
    }
    this.email = email
  }

  get value () {
    return this.email
  }
}