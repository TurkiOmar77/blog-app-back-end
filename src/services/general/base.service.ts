// src/utils/base.service.ts
import prisma from "../../prisma/client"

export class BaseService<T extends keyof typeof prisma> {
  protected model: any

  constructor(model: T) {
    this.model = prisma[model]
  }

  async create(data: any) {
    return this.model.create({ data })
  }

  async findAll(where = {}, skip = 0, take = 10 , include? : any , orderBy?:any) {
    const [data, total] = await Promise.all([
      this.model.findMany({ where, skip, take , include , orderBy }),
      this.model.count({ where }),
    ])
    return {
      data,
      pagination: { total, skip, take },
    }
  }

  async findById(id: number , include? :any ) {
    return this.model.findUnique({ where: { id } , include })
  }

  async update(id: number, data: any) {
    return this.model.update({ where: { id }, data })
  }

  async delete(id: number) {
    return this.model.delete({ where: { id } })
  }
}
