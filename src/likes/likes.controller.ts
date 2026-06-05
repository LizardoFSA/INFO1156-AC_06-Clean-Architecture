import { Body, Controller, Param, Post } from "@nestjs/common"
import { CreateLikeCommand } from "@/likes/application/commands/create-like.command"
import { CreateLikeUseCase } from "@/likes/application/use-cases/create-like.use-case"
import { AddLikeDto } from "@/likes/likes.dtos"

@Controller("api/posts/:id/likes")
export class LikesController {
    constructor(private readonly createLikeUseCase: CreateLikeUseCase) {}

    @Post()
    create(@Param("id") postId: string, @Body() body: AddLikeDto) {
        const command: CreateLikeCommand = {
            reactionType: body.reactionType,
            weight: body.weight,
        }

        return this.createLikeUseCase.execute(postId, command)
    }
}
