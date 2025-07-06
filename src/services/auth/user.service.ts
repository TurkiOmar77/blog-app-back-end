import prisma from "../../prisma/client";
import bcrypt from 'bcryptjs'
import { User } from "@prisma/client";

export const UserService = {
    async register(data : {name : string , email: string , password: string}) : Promise<User>{
        const hashedPassword = await bcrypt.hash(data.password ,10)

        return prisma.user.create({
            data :{
                name : data.name,
                email : data.email,
                password : hashedPassword
            }
        })
    },

    async findByEmail(email : string):Promise<User | null >{
        return prisma.user.findUnique({
            where : {email }, 
        })
    },

    async getAllUsers(){
        return prisma.user.findMany({
            select:{
                id: true,
                name : true,
                email :true,
            }
        })
    }
}