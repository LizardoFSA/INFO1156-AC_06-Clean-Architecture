import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { CreateLikeCommand } from "@/likes/application/commands/create-like.command"
import {
    ILikeRepository,
    LIKE_REPOSITORY,
} from "@/likes/domain/like.repository"
import { Like } from "@/likes/domain/like.entity"
import { PostsService } from "@/posts/posts.service"

@Injectable()
export class CreateLikeUseCase {
    constructor(
        @Inject(LIKE_REPOSITORY)
        private readonly likeRepository: ILikeRepository,
        private readonly postsService: PostsService,
    ) {}

    async execute(postId: string, data: CreateLikeCommand): Promise<Like> {
        await this.postsService.findByIdOrFail(postId)

        const weight = data.weight ?? 1
        if (weight < 1) {
            throw new BadRequestException("El peso debe ser al menos 1")
        }

        return this.likeRepository.create({
            postId,
            reactionType: data.reactionType ?? "like",
            weight,
            source: "likes-module",
        })
    }
}
