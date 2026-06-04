import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { CreateCommentDto } from "@/comments/comments.dtos"
import { ListCommentsUseCase } from "@/comments/application/use-cases/list-comments.use-case"
import { CreateCommentUseCase } from "@/comments/application/use-cases/create-comment.use-case"

@Controller("api/posts/:id/comments")
export class CommentsController {
    constructor(
        private readonly listCommentsUseCase: ListCommentsUseCase,
        private readonly createCommentUseCase: CreateCommentUseCase,
    ) {}

    @Get()
    async list(@Param("id") postId: string) {
        const comments = await this.listCommentsUseCase.execute(postId)

        return {
            total_comments: comments.length,
            comments,
        }
    }

    @Post()
    create(@Param("id") postId: string, @Body() body: CreateCommentDto) {
        return this.createCommentUseCase.execute(postId, body)
    }
}
