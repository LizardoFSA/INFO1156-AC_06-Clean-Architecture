import { Inject, Injectable, NotFoundException } from "@nestjs/common"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/posts/domain/post.repository"
import { Post } from "@/posts/domain/post.entity"

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

    async findByIdOrFail(id: string): Promise<Post> {
        const post = await this.postRepository.findById(id)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }
        return post
    }
}
