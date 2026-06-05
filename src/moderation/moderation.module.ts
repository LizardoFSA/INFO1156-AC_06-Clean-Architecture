import { Module } from "@nestjs/common"
import { ModerationController } from "@/moderation/moderation.controller"
import { ModerationService } from "@/moderation/moderation.service"
import { PROHIBITED_WORD_REPOSITORY } from "@/moderation/domain/prohibited-word.repository"
import { PrismaProhibitedWordRepository } from "@/moderation/infrastructure/prisma-prohibited-word.repository"
import { ListProhibitedWordsUseCase } from "@/moderation/application/use-cases/list-prohibited-words.use-case"
import { CreateProhibitedWordUseCase } from "@/moderation/application/use-cases/create-prohibited-word.use-case"
import { DeleteProhibitedWordUseCase } from "@/moderation/application/use-cases/delete-prohibited-word.use-case"

@Module({
    controllers: [ModerationController],
    providers: [
        { provide: PROHIBITED_WORD_REPOSITORY, useClass: PrismaProhibitedWordRepository },
        ModerationService,
        ListProhibitedWordsUseCase,
        CreateProhibitedWordUseCase,
        DeleteProhibitedWordUseCase,
    ],
    exports: [ModerationService],
})
export class ModerationModule {}
