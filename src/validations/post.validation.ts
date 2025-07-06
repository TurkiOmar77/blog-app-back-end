import Joi from 'joi'

export const createPostSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content : Joi.string().min(10).required(),
    authorId : Joi.number().required()
})

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  content: Joi.string().min(10),
}).min(1)


