import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import { Like } from "@/likes/domain/like.entity"
import {
    CreateLikeData,
    ILikeRepository,
} from "@/likes/domain/like.repository"

type PrismaLike = {
    id: string
    postId: string
    reactionType: string
    weight: number
    source: string
    createdAt: Date
}

@Injectable()
export class PrismaLikeRepository implements ILikeRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateLikeData): Promise<Like> {
        const record = await this.prisma.like.create({ data })
        return this.toEntity(record)
    }

    private toEntity(record: PrismaLike): Like {
        return new Like(
            record.id,
            record.postId,
            record.reactionType,
            record.weight,
            record.source,
            record.createdAt,
        )
    }
}
