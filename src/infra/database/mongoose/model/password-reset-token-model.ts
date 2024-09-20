import { model, Schema } from 'mongoose'

const schema = new Schema({
  uuid: String,
  toke: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
})

schema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 })

export const PasswordResetTokenModel = model('PasswordResetToken', schema)
