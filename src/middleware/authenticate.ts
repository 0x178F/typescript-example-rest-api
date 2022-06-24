import {Request, Response, NextFunction} from 'express'
import {decode} from '../utils/jwt'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization  
  const token = authorization?.split(' ')[1] //Bearer Token

  if (!token) return res.status(401).send('yetkiniz yok.')
  
  const data = decode(token)

  if (data?.user) {
    // @ts-ignore
    req.user = data.user
    return next()
  }

  return res.status(403).json({error: "Invalid Token"})
}
