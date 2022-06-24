import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

/**
 * @param name:string
 * @param email:string
 * @param password:string
 */

export interface IUserSchema extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  password: string
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new mongoose.Schema(
  {
    name: {type: String},
    email: {type: String, unique: true},
    password: {type: String}
  },
  {timestamps: true, versionKey: false}
)

userSchema.pre('save', async function (next): Promise<void> {
  if (!this.isModified('password')) return next()
  let user = this as IUserSchema
  const hashedPassword = await bcrypt.hash(user.password, 10)
  user.password = hashedPassword
  next()
})

userSchema.methods.comparePassword = async function (password: string){
  const user = this as IUserSchema
  return await bcrypt.compare(password, user.password)
}

const Users = mongoose.model<IUserSchema>('Users', userSchema)
export default Users
