import { Inject, Injectable } from "@nestjs/common"
import {
    FeedMode,
    FeedRankingStrategyFactory,
} from "@/posts/feed-ranking.strategy"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/posts/domain/post.repository"
import { RelevanceCalculator } from "@/posts/domain/relevance.calculator"

@Injectable()
export class GetFeedUseCase {
    private readonly relevanceCalculator = new RelevanceCalculator()

    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
        private readonly feedRankingFactory: FeedRankingStrategyFactory,
    ) {}

    async execute(mode: FeedMode = "latest", categoryId?: string) {
        const rawPosts = await this.postRepository.findFeedPosts(categoryId)
        const posts = this.relevanceCalculator.scoreAll(rawPosts)
        return this.feedRankingFactory.forMode(mode).rank(posts)
    }
}
