import express from 'express'
import helmet from 'helmet'
import router from '../router'
import config from '../config'

//get all config
config()

//create express app
const app = express()

//middleware
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//all routers
router(app)

export default app
