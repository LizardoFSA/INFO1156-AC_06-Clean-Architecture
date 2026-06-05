import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import {
    COMMENT_REPOSITORY,
    ICommentRepository,
} from "@/comments/domain/comment.repository"
import { Comment } from "@/comments/domain/comment.entity"
import { CreateCommentCommand } from "@/comments/application/commands/create-comment.command"
import { ModerationService } from "@/moderation/moderation.service"
import { PostsService } from "@/posts/posts.service"

@Injectable()
export class CreateCommentUseCase {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepository: ICommentRepository,
        private readonly postsService: PostsService,
        private readonly moderationService: ModerationService,
    ) {}

    async execute(
        postId: string,
        data: CreateCommentCommand,
    ): Promise<Comment> {
        const post = await this.postsService.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }

        const moderation = await this.moderationService.moderate(data.content)
        if (!moderation.approved) {
            throw new BadRequestException(
                moderation.reason ?? "Comentario bloqueado por moderación",
            )
        }

        return this.commentRepository.create({
            postId,
            content: data.content,
            source: "comments-module",
        })
    }
}
