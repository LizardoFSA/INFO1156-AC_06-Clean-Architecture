import { Inject, Injectable } from "@nestjs/common"
import {
    FeedMode,
    FeedRankingStrategyFactory,
} from "@/posts/feed-ranking.strategy"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/posts/domain/post.repository"

@Injectable()
export class GetFeedUseCase {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
        private readonly feedRankingFactory: FeedRankingStrategyFactory,
    ) {}

    async execute(mode: FeedMode = "latest", categoryId?: string) {
        const posts = await this.postRepository.findFeedPosts(categoryId)
        return this.feedRankingFactory.forMode(mode).rank(posts)
    }
}
