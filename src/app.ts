import database from './loader/connect'
import createServer from './loader/server'
import logger from './logger/'

//create express server
const app = createServer

//listen server and connect db
app.listen(process.env.APP_PORT, async () => {
  await database()
  logger.info(`Server is running on port ${process.env.APP_PORT}`)
})

