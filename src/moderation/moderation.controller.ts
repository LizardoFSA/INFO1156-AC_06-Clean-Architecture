import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common"
import { CreateProhibitedWordDto } from "@/moderation/moderation.dtos"
import { ListProhibitedWordsUseCase } from "@/moderation/application/use-cases/list-prohibited-words.use-case"
import { CreateProhibitedWordUseCase } from "@/moderation/application/use-cases/create-prohibited-word.use-case"
import { DeleteProhibitedWordUseCase } from "@/moderation/application/use-cases/delete-prohibited-word.use-case"

@Controller("api/admin/prohibited-words")
export class ModerationController {
    constructor(
        private readonly listProhibitedWordsUseCase: ListProhibitedWordsUseCase,
        private readonly createProhibitedWordUseCase: CreateProhibitedWordUseCase,
        private readonly deleteProhibitedWordUseCase: DeleteProhibitedWordUseCase,
    ) {}

    @Get()
    findAll() {
        return this.listProhibitedWordsUseCase.execute()
    }

    @Post()
    create(@Body() body: CreateProhibitedWordDto) {
        return this.createProhibitedWordUseCase.execute(body)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.deleteProhibitedWordUseCase.execute(id)
    }
}
