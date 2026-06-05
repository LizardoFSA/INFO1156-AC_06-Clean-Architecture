import { Inject, Injectable } from "@nestjs/common"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/posts/domain/post.repository"

// Fachada mantenida para compatibilidad con CommentsService y LikesService
// mientras esos módulos completan su propia refactorización a Clean Architecture
@Injectable()
export class PostsService {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
    ) {}

    findById(id: string) {
        return this.postRepository.findById(id)
    }
}
