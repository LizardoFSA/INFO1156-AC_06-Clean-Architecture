export class Like {
    constructor(
        readonly id: string,
        readonly postId: string,
        readonly reactionType: string,
        readonly weight: number,
        readonly source: string,
        readonly createdAt: Date,
    ) {}
}
