import { Request , Response ,NextFunction } from "express";
import { BaseService } from "../../services/general/base.service";
import prisma from "../../prisma/client";
export class BaseController<T extends keyof typeof prisma>{
    protected service : BaseService<T>

    constructor(service : BaseService<T>){
        this.service = service
    }

    protected beforeCreate(req: Request, data: any): any {
    return data; 
    }

    create = async (req :Request , res : Response , next : NextFunction) =>{
        const processedData = this.beforeCreate(req, req.body);
        const data = await this.service.create(processedData)
        return res.status(201).json({
            success : true,
            data
        })
    }

    findAll = async (req : Request , res : Response , next : NextFunction) =>{
        const skip = req.query.skip ? parseInt(req.query.skip as string) : 0
        const take = req.query.take ? parseInt(req.query.take as string) :10
        const where = req.query.where ? JSON.parse(req.query.where as string) : {}
        const include =req.query.include ? JSON.parse(req.query.include as string) : undefined
        const orderBy = req .query.orderBy ? JSON.parse(req.query.orderBy as string) : undefined
        const result = await this.service.findAll(where,skip,take , include , orderBy)

        return res.status(200).json({
            success : true,
            ...result
        })
    }

    findById = async (req : Request , res : Response , next : NextFunction) =>{
        const id = parseInt(req.params.id)
        const include =req.query.include ? JSON.parse(req.query.include as string) : undefined

        const data = await this.service.findById(id , include)
        if(!data){
            return res.status(404).json({
                success : false,
                message : "Not Found"
            })
        }
        return res.status(200).json({
            success : true,
            data
        })
    }

    update = async (req : Request , res : Response , next : NextFunction) =>{
        const id = parseInt(req.params.id)
        const data = await this.service.update(id , req.body)
        return res.status(200).json({
            success : true,
            data
        })
    }

    delete = async (req : Request , res : Response , next : NextFunction) =>{
        const id = parseInt(req.params.id)
        const data = await this.service.delete(id)
        return res.status(200).json({
            success : true,
            data
        })
    }
}