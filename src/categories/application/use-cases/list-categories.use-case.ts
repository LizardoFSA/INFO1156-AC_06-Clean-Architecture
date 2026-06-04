import { Inject, Injectable } from "@nestjs/common"
import {
    CATEGORY_REPOSITORY,
    ICategoryRepository,
} from "@/categories/domain/category.repository"

@Injectable()
export class ListCategoriesUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: ICategoryRepository,
    ) {}

    execute() {
        return this.categoryRepository.findAll()
    }
}
