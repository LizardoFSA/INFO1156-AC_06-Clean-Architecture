import { Inject, Injectable } from "@nestjs/common"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/posts/domain/post.repository"

// Puerto de solo lectura expuesto a otros módulos (comments, likes) para
// verificar la existencia de un post sin acoplarlos al repositorio de posts.
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
