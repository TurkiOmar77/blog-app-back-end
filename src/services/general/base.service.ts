// src/utils/base.service.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// T هو اسم الموديل داخل prisma (مثلاً: 'user' أو 'post')
export class BaseService<T extends keyof typeof prisma> {
  private model: any

  constructor(model: T) {
    this.model = prisma[model]
  }

  async create(data: any) {
    return this.model.create({ data })
  }

  async findAll(where = {}, skip = 0, take = 10) {
    const [data, total] = await Promise.all([
      this.model.findMany({ where, skip, take }),
      this.model.count({ where }),
    ])
    return {
      data,
      pagination: { total, skip, take },
    }
  }

  async findById(id: number) {
    return this.model.findUnique({ where: { id } })
  }

  async update(id: number, data: any) {
    return this.model.update({ where: { id }, data })
  }

  async delete(id: number) {
    return this.model.delete({ where: { id } })
  }
}
