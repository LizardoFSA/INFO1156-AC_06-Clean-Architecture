import { ProhibitedWord } from "@/moderation/domain/prohibited-word.entity"

export interface CreateProhibitedWordData {
    word: string
    category: string
}

export interface IProhibitedWordRepository {
    findAll(): Promise<ProhibitedWord[]>
    create(data: CreateProhibitedWordData): Promise<ProhibitedWord>
    delete(id: string): Promise<ProhibitedWord>
}

export const PROHIBITED_WORD_REPOSITORY = Symbol("IProhibitedWordRepository")
