export class Post {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly description: string,
        readonly imageUrl: string,
        readonly categoryId: string | null,
        readonly createdAt: Date,
        readonly updatedAt: Date,
    ) {}
}

export type FeedPost = {
    id: string
    title: string
    description: string
    imageUrl: string
    categoryId: string | null
    category: string | null
    createdAt: Date
    updatedAt: Date
    likesCount: number
    commentsCount: number
    relevanceScore: number
}
