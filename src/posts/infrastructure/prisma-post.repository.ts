import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import {
    CreatePostData,
    IPostRepository,
} from "@/posts/domain/post.repository"
import { FeedPost, Post } from "@/posts/domain/post.entity"

type PrismaPost = {
    id: string
    title: string
    description: string
    imageUrl: string
    categoryId: string | null
    createdAt: Date
    updatedAt: Date
}

@Injectable()
export class PrismaPostRepository implements IPostRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreatePostData): Promise<Post> {
        const record = await this.prisma.post.create({ data })
        return this.toEntity(record)
    }

    async findAll(): Promise<Post[]> {
        const records = await this.prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        })
        return records.map((r) => this.toEntity(r))
    }

    async findById(id: string): Promise<Post | null> {
        const record = await this.prisma.post.findUnique({ where: { id } })
        return record ? this.toEntity(record) : null
    }

    async findFeedPosts(categoryId?: string): Promise<FeedPost[]> {
        const posts = await this.prisma.post.findMany({
            where: categoryId ? { categoryId } : undefined,
            include: { comments: true, likes: true, category: true },
        })

        return posts.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            imageUrl: post.imageUrl,
            categoryId: post.categoryId,
            category: post.category?.name ?? null,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            likesCount: post.likes.reduce((sum, l) => sum + l.weight, 0),
            commentsCount: post.comments.length,
            relevanceScore: 0,
        }))
    }

    private toEntity(record: PrismaPost): Post {
        return new Post(
            record.id,
            record.title,
            record.description,
            record.imageUrl,
            record.categoryId,
            record.createdAt,
            record.updatedAt,
        )
    }
}
