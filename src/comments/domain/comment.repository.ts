import { Comment } from "@/comments/domain/comment.entity"

export interface CreateCommentData {
    postId: string
    content: string
    source: string
}

export interface ICommentRepository {
    create(data: CreateCommentData): Promise<Comment>
    findByPostId(postId: string): Promise<Comment[]>
}

export const COMMENT_REPOSITORY = Symbol("ICommentRepository")
