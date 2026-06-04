import { Category } from "@/categories/domain/category.entity"

export interface ICategoryRepository {
    findAll(): Promise<Category[]>
}

export const CATEGORY_REPOSITORY = Symbol("ICategoryRepository")
