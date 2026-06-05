import { FeedPost, FeedPostData } from "@/posts/domain/post.entity"

/**
 * Domain service: calcula la puntuación de relevancia de una publicación.
 *
 * La relevancia combina dos señales de negocio:
 *   - volumen de participación: likes (ponderados) + comentarios,
 *   - actividad reciente: las publicaciones nuevas pesan más y decaen con el tiempo.
 *
 * Es lógica de negocio pura: no depende de NestJS, Prisma ni HTTP, por lo que
 * puede testearse de forma aislada y vive en la capa de dominio.
 */
export class RelevanceCalculator {
    // Un comentario refleja más interés que un like, así que pesa más.
    private static readonly COMMENT_WEIGHT = 2

    // Vida media (en horas) del impulso por novedad: a las 24h la frescura
    // aporta la mitad que recién publicada.
    private static readonly RECENCY_HALF_LIFE_HOURS = 24

    score(post: FeedPostData, now: Date = new Date()): number {
        const participation =
            post.likesCount +
            post.commentsCount * RelevanceCalculator.COMMENT_WEIGHT

        const ageHours = Math.max(
            0,
            (now.getTime() - post.createdAt.getTime()) / 3_600_000,
        )
        const recencyBoost =
            1 / (1 + ageHours / RelevanceCalculator.RECENCY_HALF_LIFE_HOURS)

        return participation * recencyBoost
    }

    /** Enriquece datos crudos del feed con su puntuación de relevancia. */
    scoreAll(posts: FeedPostData[], now: Date = new Date()): FeedPost[] {
        return posts.map((post) => ({
            ...post,
            relevanceScore: this.score(post, now),
        }))
    }
}
