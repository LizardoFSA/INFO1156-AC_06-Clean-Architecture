export class Post {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly description: string,
        readonly imageUrl: string,
        readonly categoryId: string | null,
        readonly createdAt: Date,
        readonly updatedAt: Date,
    ) {}
}

// Datos crudos del feed tal como los provee la capa de persistencia.
// No incluye relevanceScore: ese valor es una regla de negocio que se
// calcula en el dominio (RelevanceCalculator), no en la infraestructura.
export type FeedPostData = {
    id: string
    title: string
    description: string
    imageUrl: string
    categoryId: string | null
    category: string | null
    createdAt: Date
    updatedAt: Date
    likesCount: number
    commentsCount: number
}

// Vista enriquecida del feed: dato crudo + puntuación de relevancia derivada.
export type FeedPost = FeedPostData & {
    relevanceScore: number
}
