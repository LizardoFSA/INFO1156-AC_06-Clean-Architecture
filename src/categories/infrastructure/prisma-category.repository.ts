import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import { Category } from "@/categories/domain/category.entity"
import { ICategoryRepository } from "@/categories/domain/category.repository"

type PrismaCategory = {
    id: string
    name: string
    slug: string
}

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Category[]> {
        const records = await this.prisma.category.findMany({
            orderBy: { name: "asc" },
        })
        return records.map((r) => this.toEntity(r))
    }

    private toEntity(record: PrismaCategory): Category {
        return new Category(record.id, record.name, record.slug)
    }
}
