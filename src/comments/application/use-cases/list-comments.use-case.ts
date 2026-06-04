import { Inject, Injectable, NotFoundException } from "@nestjs/common"
import {
    COMMENT_REPOSITORY,
    ICommentRepository,
} from "@/comments/domain/comment.repository"
import { PostsService } from "@/posts/posts.service"

@Injectable()
export class ListCommentsUseCase {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepository: ICommentRepository,
        private readonly postsService: PostsService,
    ) {}

    async execute(postId: string) {
        const post = await this.postsService.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }

        const comments = await this.commentRepository.findByPostId(postId)

        return {
            total_comments: comments.length,
            comments,
        }
    }
}
