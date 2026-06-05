import { Inject, Injectable } from "@nestjs/common"
import {
    IProhibitedWordRepository,
    PROHIBITED_WORD_REPOSITORY,
} from "@/moderation/domain/prohibited-word.repository"

export type ModerationResult = {
    approved: boolean
    reason?: string
    category?: string
}

const buildFuzzyRegex = (word: string) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    return new RegExp(escaped.split("").join("[^a-zA-Z0-9]*"), "gi")
}

@Injectable()
export class ModerationService {
    constructor(
        @Inject(PROHIBITED_WORD_REPOSITORY)
        private readonly repository: IProhibitedWordRepository,
    ) {}

    async moderate(text: string): Promise<ModerationResult> {
        const words = await this.repository.findAll()

        for (const pw of words) {
            const regex = buildFuzzyRegex(pw.word)
            if (regex.test(text)) {
                return {
                    approved: false,
                    reason: `Contiene palabra prohibida: "${pw.word}"`,
                    category: pw.category,
                }
            }
        }

        return { approved: true }
    }
}
