import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import { ProhibitedWord } from "@/moderation/domain/prohibited-word.entity"
import {
    CreateProhibitedWordData,
    IProhibitedWordRepository,
} from "@/moderation/domain/prohibited-word.repository"

type PrismaProhibitedWord = {
    id: string
    word: string
    category: string
    createdAt: Date
}

@Injectable()
export class PrismaProhibitedWordRepository implements IProhibitedWordRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<ProhibitedWord[]> {
        const records = await this.prisma.prohibitedWord.findMany({
            orderBy: { createdAt: "desc" },
        })
        return records.map((r) => this.toEntity(r))
    }

    async create(data: CreateProhibitedWordData): Promise<ProhibitedWord> {
        const record = await this.prisma.prohibitedWord.create({ data })
        return this.toEntity(record)
    }

    async delete(id: string): Promise<ProhibitedWord> {
        try {
            const record = await this.prisma.prohibitedWord.delete({ where: { id } })
            return this.toEntity(record)
        } catch (err: unknown) {
            if (
                err instanceof Error &&
                "code" in err &&
                (err as { code: string }).code === "P2025"
            ) {
                throw new NotFoundException("Palabra prohibida no encontrada")
            }
            throw err
        }
    }

    private toEntity(record: PrismaProhibitedWord): ProhibitedWord {
        return new ProhibitedWord(
            record.id,
            record.word,
            record.category,
            record.createdAt,
        )
    }
}
