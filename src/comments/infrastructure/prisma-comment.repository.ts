import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import {
    CreateCommentData,
    ICommentRepository,
} from "@/comments/domain/comment.repository"
import { Comment } from "@/comments/domain/comment.entity"

type PrismaComment = {
    id: string
    postId: string
    content: string
    source: string
    createdAt: Date
    updatedAt: Date
}

@Injectable()
export class PrismaCommentRepository implements ICommentRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateCommentData): Promise<Comment> {
        const record = await this.prisma.comment.create({ data })
        return this.toEntity(record)
    }

    async findByPostId(postId: string): Promise<Comment[]> {
        const records = await this.prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
        })
        return records.map((r) => this.toEntity(r))
    }

    private toEntity(record: PrismaComment): Comment {
        return new Comment(
            record.id,
            record.postId,
            record.content,
            record.source,
            record.createdAt,
            record.updatedAt,
        )
    }
}
