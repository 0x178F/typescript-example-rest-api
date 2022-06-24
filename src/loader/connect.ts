import mongoose from 'mongoose'
import logger from '../logger/'
const conn = async () => {
  try {
    logger.info("Successfully connected to the database.")
    await mongoose.connect(process.env.DB_URL as string)
  } catch (error: any) {
    logger.error(error?.message)
    process.exit(1)
  }
}

export default conn
