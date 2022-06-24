import {Express} from 'express'
import User from './user'
import Auth from './auth'

export default (app: Express) => {
    app.use('/user', User)
    app.use('/auth', Auth)
}