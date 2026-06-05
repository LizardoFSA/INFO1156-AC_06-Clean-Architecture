import { Inject, Injectable } from "@nestjs/common"
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
        await this.postsService.findByIdOrFail(postId)

        const comments = await this.commentRepository.findByPostId(postId)

        return {
            total_comments: comments.length,
            comments,
        }
    }
}
