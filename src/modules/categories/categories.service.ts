import type { PaginationResponse } from '@common/types';
import { idNotFoundMessage } from '@common/utils';
import { Prisma } from '@generated/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import type {
  CategorySearchParamsDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';
import type { Category } from './entities';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async fetchAll({
    sortBy,
    order,
    page,
    limit,
  }: CategorySearchParamsDto): Promise<PaginationResponse<Category>> {
    const orderBy: Prisma.CategoryOrderByWithRelationInput | undefined =
      sortBy && order ? { [sortBy]: order } : undefined;

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.category.findMany({
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.category.count(),
    ]);

    return {
      data,
      page,
      limit,
      total,
    };
  }

  async fetchOne(id: string): Promise<Category> {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(idNotFoundMessage('Category'));
    }

    return category;
  }

  async insertOne(data: CreateCategoryDto): Promise<Category> {
    return this.prismaService.category.create({
      data,
    });
  }

  async updateOne(id: string, dto: UpdateCategoryDto): Promise<Category> {
    try {
      return this.prismaService.category.update({
        where: { id },
        data: dto,
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2005'
      )
        throw new NotFoundException(idNotFoundMessage('Category'));
      else throw err;
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await this.prismaService.category.delete({
        where: { id },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2005'
      )
        throw new NotFoundException(idNotFoundMessage('Category'));
      else throw err;
    }
  }
}
