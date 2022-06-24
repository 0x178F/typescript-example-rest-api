import {Request, Response, NextFunction} from 'express'
import {ObjectSchema} from 'joi'

export const validate = (schema: ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (error: any) {
    res.status(400).json({error: error.details[0]?.message});
  }
}
