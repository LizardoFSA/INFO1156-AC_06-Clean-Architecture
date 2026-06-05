import { Module } from "@nestjs/common"
import { LikesController } from "@/likes/likes.controller"
import { PostsModule } from "@/posts/posts.module"
import { LIKE_REPOSITORY } from "@/likes/domain/like.repository"
import { PrismaLikeRepository } from "@/likes/infrastructure/prisma-like.repository"
import { CreateLikeUseCase } from "@/likes/application/use-cases/create-like.use-case"

@Module({
    imports: [PostsModule],
    controllers: [LikesController],
    providers: [
        { provide: LIKE_REPOSITORY, useClass: PrismaLikeRepository },
        CreateLikeUseCase,
    ],
})
export class LikesModule {}
