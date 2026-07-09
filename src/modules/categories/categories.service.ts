import { randomUUID } from 'node:crypto';
import { ArticlesService } from '@articles/articles.service';
import { BaseEntityService } from '@common/services';
import type { PaginationResponse } from '@common/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  CategorySearchParamsDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';
import { Category } from './entities';

@Injectable()
export class CategoriesService extends BaseEntityService<Category> {
  constructor(private articleService: ArticlesService) {
    super();
  }

  #store: Category[] = [];

  async fetchAll({
    sortBy,
    order,
    page,
    limit,
  }: CategorySearchParamsDto): Promise<PaginationResponse<Category>> {
    const list = [...this.#store];
    this.sortBySearchParams(list, sortBy, order);
    return this.mapToPagination(list, page, limit);
  }

  async fetchOne(id: string): Promise<Category> {
    const category = this.#store.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException("Category doesn't exist");
    }
    return category;
  }

  async insertOne(dto: CreateCategoryDto): Promise<Category> {
    const category = new Category({
      id: randomUUID(),
      ...dto,
    });
    this.#store.push(category);
    return category;
  }

  async updateOne(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const oldCategory = await this.fetchOne(id);
    const newCategory = { ...oldCategory, ...dto };
    this.#store = this.#store.map((category) =>
      category.id === oldCategory.id ? newCategory : category,
    );
    return newCategory;
  }

  async deleteOne(id: string): Promise<void> {
    const category = await this.fetchOne(id);
    this.#store = this.#store.filter(({ id }) => category.id !== id);
    await this.articleService.resetCategoryId(id);
  }
}
