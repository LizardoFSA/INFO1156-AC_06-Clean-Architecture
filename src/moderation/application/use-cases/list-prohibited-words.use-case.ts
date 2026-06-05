import { Inject, Injectable } from "@nestjs/common"
import {
    IProhibitedWordRepository,
    PROHIBITED_WORD_REPOSITORY,
} from "@/moderation/domain/prohibited-word.repository"
import { ProhibitedWord } from "@/moderation/domain/prohibited-word.entity"

@Injectable()
export class ListProhibitedWordsUseCase {
    constructor(
        @Inject(PROHIBITED_WORD_REPOSITORY)
        private readonly repository: IProhibitedWordRepository,
    ) {}

    execute(): Promise<ProhibitedWord[]> {
        return this.repository.findAll()
    }
}
