import { Inject, Injectable } from "@nestjs/common"
import {
    IProhibitedWordRepository,
    PROHIBITED_WORD_REPOSITORY,
} from "@/moderation/domain/prohibited-word.repository"
import { ProhibitedWord } from "@/moderation/domain/prohibited-word.entity"
import { CreateProhibitedWordDto } from "@/moderation/moderation.dtos"

@Injectable()
export class CreateProhibitedWordUseCase {
    constructor(
        @Inject(PROHIBITED_WORD_REPOSITORY)
        private readonly repository: IProhibitedWordRepository,
    ) {}

    execute(data: CreateProhibitedWordDto): Promise<ProhibitedWord> {
        return this.repository.create({ word: data.word, category: data.category })
    }
}
