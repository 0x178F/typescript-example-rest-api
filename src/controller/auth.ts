import {Request, Response} from 'express'
import {loginUser} from '../service/user'
import {sign, decode} from '../utils/jwt'
import logger from '../logger'

export const login = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body)
    if (!user) return res.status(404).json({error: 'Invalid email or password'})

    const generateAccessToken = sign({user}, {expiresIn: process.env.ACCESS_TOKEN_TIME})
    const generateRefreshToken = sign({user}, {expiresIn: process.env.REFRESH_TOKEN_TIME})

    const data = {
      ...user.toObject(),
      token: {
        access_token: generateAccessToken,
        refresh_token: generateRefreshToken
      }
    }
    //@ts-ignore
    delete data.password
    return res.status(200).json(data)
  } catch (error: any) {
    logger.error({message: error.message})
    res.status(500).json({message: error.message})
  }
}

export const refreshToken = (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken
  const data = decode(refreshToken)

  //@ts-ignore
  if (req.user._id === data.user._id) {
    const generateAccessToken = sign({data}, {expiresIn: process.env.ACCESS_TOKEN_TIME})
    const generateRefreshToken = sign({data}, {expiresIn: process.env.REFRESH_TOKEN_TIME})

    res.json({
      access_token: generateAccessToken,
      refresh_token: generateRefreshToken
    })
  }
}
