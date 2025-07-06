import { Request , Response , NextFunction } from "express";
import { ApiError } from '../utils/ApiError'

export function errorHandler(
    err:any,
    req : Request ,
    res : Response,
    next : NextFunction
) {
    console.log('Error', err.stack)


    const statusCode = 
       err instanceof ApiError ? 
        err.statusCode 
        : 500
    
    const message = 
       statusCode === 500 ?
        'Internal server error'
        : err.message

    res.status(statusCode).json({
        success : false,
        message
    })
}