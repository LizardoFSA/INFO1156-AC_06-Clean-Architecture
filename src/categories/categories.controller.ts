import { Controller, Get } from "@nestjs/common"
import { ListCategoriesUseCase } from "@/categories/application/use-cases/list-categories.use-case"

@Controller("api/categories")
export class CategoriesController {
    constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) {}

    @Get()
    findAll() {
        return this.listCategoriesUseCase.execute()
    }
}
