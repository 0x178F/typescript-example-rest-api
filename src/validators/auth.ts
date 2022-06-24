import Joi from 'joi'

export const authLoginValidator = Joi.object({
    email: Joi.string().required().min(3).max(255).email(),
    password: Joi.string().required().min(6).max(255)
})

export const refreshTokenValidator = Joi.object({
    refreshToken: Joi.string().required().min(3),
})