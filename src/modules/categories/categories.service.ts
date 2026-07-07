import { randomUUID } from 'node:crypto';
import { BaseEntityService } from '@common/services';
import type { FetchAllResponse } from '@common/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  CategorySearchParamsDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';
import { Category } from './entities';

@Injectable()
export class CategoriesService extends BaseEntityService<Category> {
  #store: Category[] = [];

  fetchAll({
    sortBy,
    order,
    page,
    limit,
  }: CategorySearchParamsDto): FetchAllResponse<Category[]> {
    const list = [...this.#store];
    this.sortBySearchParams(list, sortBy, order);
    return this.mapToFetchAllResponse(list, page, limit);
  }

  fetchOne(id: string): Category {
    const category = this.#store.find((category) => category.id === id);

    if (!category) {
      throw new NotFoundException("Category doesn't exist");
    }

    return category;
  }

  insertOne(dto: CreateCategoryDto): Category {
    const category = new Category({
      id: randomUUID(),
      ...dto,
    });
    this.#store.push(category);
    return category;
  }

  updateOne(id: string, dto: UpdateCategoryDto): Category {
    const oldCategory = this.fetchOne(id);
    const newCategory = { ...oldCategory, ...dto };
    this.#store = this.#store.map((category) =>
      category.id === oldCategory.id ? newCategory : category,
    );
    return newCategory;
  }

  deleteOne(id: string): void {
    const category = this.fetchOne(id);
    this.#store = this.#store.filter(({ id }) => category.id !== id);
  }
}
