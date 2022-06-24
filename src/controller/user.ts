import {Request, Response} from 'express'
import {_create, _delete, list} from '../service/user'
import logger from '../logger'
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await _create(req.body)
    return res.status(200).json(user)
  } catch (error: any) {
    logger.error({message: error.message})
    res.status(500).json({message: error.message})
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await _delete(req.body.id)
    if (!user) {
      return res.status(404).json({error: 'User already not found.'})
    }
    return res.status(200).json(user)
  } catch (error: any) {
    logger.error({message: error.message})
    res.status(500).json({message: error.message})
  }
}

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await list()
    return res.json(users)
  } catch (error: any) {
    logger.error({message: error.message})
    res.status(500).json({message: error.message})
  }
}