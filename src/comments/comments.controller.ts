import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { CreateCommentCommand } from "@/comments/application/commands/create-comment.command"
import { CreateCommentDto } from "@/comments/comments.dtos"
import { CreateCommentUseCase } from "@/comments/application/use-cases/create-comment.use-case"
import { ListCommentsUseCase } from "@/comments/application/use-cases/list-comments.use-case"

@Controller("api/posts/:id/comments")
export class CommentsController {
    constructor(
        private readonly createCommentUseCase: CreateCommentUseCase,
        private readonly listCommentsUseCase: ListCommentsUseCase,
    ) {}

    @Get()
    list(@Param("id") postId: string) {
        return this.listCommentsUseCase.execute(postId)
    }

    @Post()
    create(@Param("id") postId: string, @Body() body: CreateCommentDto) {
        const command: CreateCommentCommand = {
            content: body.content,
        }

        return this.createCommentUseCase.execute(postId, command)
    }
}
