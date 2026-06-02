import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { CreatePostDto, FeedQueryDto } from "@/posts/posts.dtos"
import { CreatePostUseCase } from "@/posts/application/use-cases/create-post.use-case"
import { GetPostsUseCase } from "@/posts/application/use-cases/get-posts.use-case"
import { GetFeedUseCase } from "@/posts/application/use-cases/get-feed.use-case"
import { FeedMode } from "@/posts/feed-ranking.strategy"

@Controller("api/posts")
export class PostsController {
    constructor(
        private readonly createPostUseCase: CreatePostUseCase,
        private readonly getPostsUseCase: GetPostsUseCase,
        private readonly getFeedUseCase: GetFeedUseCase,
    ) {}

    @Post()
    async create(@Body() body: CreatePostDto) {
        const created = await this.createPostUseCase.execute(body)

        return {
            ok: true,
            payload: created,
        }
    }

    @Get()
    async findAll() {
        const posts = await this.getPostsUseCase.execute()

        return {
            total: posts.length,
            items: posts,
        }
    }

    @Get("feed")
    async getFeed(@Query() query: FeedQueryDto) {
        const mode = (query.mode ?? "latest") as FeedMode
        const rankedPosts = await this.getFeedUseCase.execute(
            mode,
            query.categoryId,
        )

        return {
            mode,
            count: rankedPosts.length,
            rows: rankedPosts,
        }
    }
}
