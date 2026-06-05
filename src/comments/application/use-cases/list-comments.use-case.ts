import { Inject, Injectable, NotFoundException } from "@nestjs/common"
import {
    COMMENT_REPOSITORY,
    ICommentRepository,
} from "@/comments/domain/comment.repository"
import {
    POST_LOOKUP_PORT,
    PostLookupPort,
} from "@/posts/application/ports/post-lookup.port"

@Injectable()
export class ListCommentsUseCase {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepository: ICommentRepository,
        @Inject(POST_LOOKUP_PORT)
        private readonly postLookup: PostLookupPort,
    ) {}

    async execute(postId: string) {
        const post = await this.postLookup.findById(postId)
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
