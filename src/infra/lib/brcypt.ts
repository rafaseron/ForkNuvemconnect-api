import { genSaltSync, hashSync } from 'bcrypt'


function hashPassword (password: string) {
  const salt = genSaltSync(10)

  return hashSync(password, salt)

}


export {
  hashPassword
}