import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { ModerationService } from "@/moderation/moderation.service"
import { CreatePostDto } from "@/posts/posts.dtos"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/posts/domain/post.repository"

@Injectable()
export class CreatePostUseCase {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
        private readonly moderationService: ModerationService,
    ) {}

    async execute(data: CreatePostDto) {
        const text = `${data.title} ${data.description}`
        const moderation = await this.moderationService.moderate(text)

        if (!moderation.approved) {
            throw new BadRequestException(
                moderation.reason ?? "Post bloqueado por moderación",
            )
        }

        return this.postRepository.create(data)
    }
}
