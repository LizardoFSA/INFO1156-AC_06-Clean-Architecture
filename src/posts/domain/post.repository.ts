import { FeedPost, Post } from "@/posts/domain/post.entity"

export interface CreatePostData {
    title: string
    description: string
    imageUrl: string
    categoryId?: string
}

export interface IPostRepository {
    create(data: CreatePostData): Promise<Post>
    findAll(): Promise<Post[]>
    findById(id: string): Promise<Post | null>
    findFeedPosts(categoryId?: string): Promise<FeedPost[]>
}

export const POST_REPOSITORY = Symbol("IPostRepository")
