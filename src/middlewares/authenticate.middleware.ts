import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types/jwt.type'

const JWT_SECRET = process.env.JWT_SECRET!

export const authenticate =(
    req : Request,
    res : Response,
    next : NextFunction
) =>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new ApiError(401 , 'Unauthorized: No token provided')
    }

    const token = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token,JWT_SECRET) as JwtPayload
        req.user = decoded
        next()
    } catch (err){
        throw new ApiError(401, 'Unauthorized: Invalid token')
    }
}