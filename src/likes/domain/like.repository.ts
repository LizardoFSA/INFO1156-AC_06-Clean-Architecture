import { Like } from "@/likes/domain/like.entity"

export interface CreateLikeData {
    postId: string
    reactionType: string
    weight: number
    source: string
}

export interface ILikeRepository {
    create(data: CreateLikeData): Promise<Like>
}

export const LIKE_REPOSITORY = Symbol("ILikeRepository")
