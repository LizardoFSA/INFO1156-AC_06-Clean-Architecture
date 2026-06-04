export class Comment {
    constructor(
        readonly id: string,
        readonly postId: string,
        readonly content: string,
        readonly source: string,
        readonly createdAt: Date,
        readonly updatedAt: Date,
    ) {}
}
