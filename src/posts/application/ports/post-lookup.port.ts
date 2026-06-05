import { Post } from "@/posts/domain/post.entity"

export interface PostLookupPort {
    findById(id: string): Promise<Post | null>
}

export const POST_LOOKUP_PORT = Symbol("POST_LOOKUP_PORT")
