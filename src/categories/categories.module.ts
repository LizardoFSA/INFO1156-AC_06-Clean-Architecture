import { Module } from "@nestjs/common"
import { CategoriesController } from "@/categories/categories.controller"
import { CATEGORY_REPOSITORY } from "@/categories/domain/category.repository"
import { PrismaCategoryRepository } from "@/categories/infrastructure/prisma-category.repository"
import { ListCategoriesUseCase } from "@/categories/application/use-cases/list-categories.use-case"

@Module({
    controllers: [CategoriesController],
    providers: [
        { provide: CATEGORY_REPOSITORY, useClass: PrismaCategoryRepository },
        ListCategoriesUseCase,
    ],
})
export class CategoriesModule {}
