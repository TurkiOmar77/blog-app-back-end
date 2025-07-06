import { Request , Response } from "express";
import { UserService } from "../../services/auth/user.service";
import { ApiError } from "../../utils/ApiError";
import bcrypt from 'bcryptjs'
import { generateToken } from '../../utils/jwt'

export const registerUser = async (req :Request , res : Response) =>{
    const data = req.body

    const existingUser = await UserService.findByEmail(data.email)

    if(existingUser) {
        throw new ApiError(409 , "Email already in use")
    }

    const newUser = await UserService.register(data)
    res.status(201).json({
        success : true,
        message : 'User registered successfully!',
        newUser
    })
}

export const loginUser = async (req :Request , res : Response)=>{
    const data = req.body

    const user = await UserService.findByEmail(data.email)
    if(!user){
        throw new ApiError(401, 'Invalid email or password')
    }

    const isMatch = await bcrypt.compare(data.password , user.password)
    if(!isMatch){
        throw new ApiError(401, 'Invalid email or password')
    }

      const token = generateToken({ userId: user.id })

      res.json({
        success: true,
        message: 'Login successful!',
        token,
      })
}
