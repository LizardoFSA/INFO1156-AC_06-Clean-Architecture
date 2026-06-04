import { Module } from "@nestjs/common"
import { CommentsController } from "@/comments/comments.controller"
import { ModerationModule } from "@/moderation/moderation.module"
import { PostsModule } from "@/posts/posts.module"
import { COMMENT_REPOSITORY } from "@/comments/domain/comment.repository"
import { PrismaCommentRepository } from "@/comments/infrastructure/prisma-comment.repository"
import { ListCommentsUseCase } from "@/comments/application/use-cases/list-comments.use-case"
import { CreateCommentUseCase } from "@/comments/application/use-cases/create-comment.use-case"

@Module({
    imports: [PostsModule, ModerationModule],
    controllers: [CommentsController],
    providers: [
        { provide: COMMENT_REPOSITORY, useClass: PrismaCommentRepository },
        ListCommentsUseCase,
        CreateCommentUseCase,
    ],
})
export class CommentsModule {}
