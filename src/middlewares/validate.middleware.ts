import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import Joi from 'joi'

export function validate(schema : Joi.ObjectSchema){
    return (req:Request , res:Response , next :NextFunction) =>{
        const {error} = schema.validate(req.body, {abortEarly : false})

        if(error){
            const message = error.details.map(d => d.message).join(', ')
            throw new ApiError(400 , message)
        }
        
        next()
    }
}