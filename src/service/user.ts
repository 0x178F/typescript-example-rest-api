import {DocumentDefinition} from 'mongoose'
import User, {IUserSchema} from '../model/user'

export const _create = async (data: DocumentDefinition<IUserSchema>) => {
  return await User.create(data)
}

export const _delete = async (_id: IUserSchema['_id']) => {
  return await User.findByIdAndDelete(_id)
}

export const loginUser = async ({email, password}: {email: IUserSchema['email']; password: IUserSchema['password']}) => {
  const user = await User.findOne({email})
  if (!user) return

  const isValid = await user.comparePassword(password)
  if (isValid) return user
}

export const list = async () => {
  return await User.find()
}
