import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import { CreateLikeCommand } from "@/likes/application/commands/create-like.command"
import {
    ILikeRepository,
    LIKE_REPOSITORY,
} from "@/likes/domain/like.repository"
import { Like } from "@/likes/domain/like.entity"
import {
    POST_LOOKUP_PORT,
    PostLookupPort,
} from "@/posts/application/ports/post-lookup.port"

@Injectable()
export class CreateLikeUseCase {
    constructor(
        @Inject(LIKE_REPOSITORY)
        private readonly likeRepository: ILikeRepository,
        @Inject(POST_LOOKUP_PORT)
        private readonly postLookup: PostLookupPort,
    ) {}

    async execute(postId: string, data: CreateLikeCommand): Promise<Like> {
        const post = await this.postLookup.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }

        const weight = data.weight ?? 1
        if (weight < 1) {
            throw new BadRequestException("El peso debe ser al menos 1")
        }

        return this.likeRepository.create({
            postId,
            reactionType: data.reactionType ?? "like",
            weight,
            source: "likes-module",
        })
    }
}
