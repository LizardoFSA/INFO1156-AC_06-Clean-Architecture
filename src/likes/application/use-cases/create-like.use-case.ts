import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import { AddLikeDto } from "@/likes/likes.dtos"
import {
    ILikeRepository,
    LIKE_REPOSITORY,
} from "@/likes/domain/like.repository"
import { PostsService } from "@/posts/posts.service"

@Injectable()
export class CreateLikeUseCase {
    constructor(
        @Inject(LIKE_REPOSITORY)
        private readonly likeRepository: ILikeRepository,
        private readonly postsService: PostsService,
    ) {}

    async execute(postId: string, data: AddLikeDto) {
        const post = await this.postsService.findById(postId)

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
