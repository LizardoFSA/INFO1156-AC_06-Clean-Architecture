import { Module } from "@nestjs/common"
import { ModerationModule } from "@/moderation/moderation.module"
import { PostsController } from "@/posts/posts.controller"
import { PostsService } from "@/posts/posts.service"
import { FeedRankingStrategyFactory } from "@/posts/feed-ranking.strategy"
import { POST_REPOSITORY } from "@/posts/domain/post.repository"
import { PrismaPostRepository } from "@/posts/infrastructure/prisma-post.repository"
import { CreatePostUseCase } from "@/posts/application/use-cases/create-post.use-case"
import { GetPostsUseCase } from "@/posts/application/use-cases/get-posts.use-case"
import { GetFeedUseCase } from "@/posts/application/use-cases/get-feed.use-case"

@Module({
    imports: [ModerationModule],
    controllers: [PostsController],
    providers: [
        { provide: POST_REPOSITORY, useClass: PrismaPostRepository },
        PostsService,
        FeedRankingStrategyFactory,
        CreatePostUseCase,
        GetPostsUseCase,
        GetFeedUseCase,
    ],
    exports: [PostsService],
})
export class PostsModule {}
