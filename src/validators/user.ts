import Joi from 'joi'

export const createUserValidator = Joi.object({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().required().min(3).max(255).email(),
    password: Joi.string().required().min(6).max(255)
})

export const deleteUserValidator = Joi.object({
    id: Joi.string().required().hex().length(24)
})