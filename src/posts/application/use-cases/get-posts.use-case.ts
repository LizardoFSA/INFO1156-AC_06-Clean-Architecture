import { Inject, Injectable } from "@nestjs/common"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/posts/domain/post.repository"

@Injectable()
export class GetPostsUseCase {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
    ) {}

    execute() {
        return this.postRepository.findAll()
    }
}
