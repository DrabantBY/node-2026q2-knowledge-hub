import { Permission } from '@common/decorators';
import {
  reqBodyValidatePipe,
  reqQueryValidatePipe,
  uuidValidatePipe,
} from '@common/pipes';
import type { PaginationResponse } from '@common/types';
import { Role } from '@generated/enums';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiErrorResponse,
  ApiPaginationResponse,
  ApiQueryParams,
} from '@swagger/decorators';
import { CategoriesService } from './categories.service';
import { CATEGORY_SORT_KEY } from './const';
import {
  CategorySearchParamsDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';
import { Category } from './entities';

@ApiTags('Categories Api')
@Permission([Role.ADMIN])
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Permission([Role.VIEWER, Role.EDITOR])
  @Get()
  @ApiOperation({ summary: 'Get all categories.' })
  @ApiQueryParams(CATEGORY_SORT_KEY)
  @ApiPaginationResponse(Category)
  @ApiErrorResponse({
    withQueryError: true,
  })
  fetchAll(
    @Query(reqQueryValidatePipe()) searchParams: CategorySearchParamsDto,
  ): Promise<PaginationResponse<Category>> {
    return this.categoryService.fetchAll(searchParams);
  }

  @Permission([Role.VIEWER, Role.EDITOR])
  @Get(':id')
  @ApiOperation({ summary: 'Get single category by id.' })
  @ApiOkResponse({ type: Category, description: 'Ok' })
  @ApiErrorResponse({
    entity: 'Category',
    withUuidError: true,
  })
  fetchOne(
    @Param('id', uuidValidatePipe('Category')) id: string,
  ): Promise<Category> {
    return this.categoryService.fetchOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add new category (admin only).' })
  @ApiCreatedResponse({ type: Category, description: 'Created' })
  @ApiErrorResponse({
    withBodyError: true,
  })
  insertOne(
    @Body(reqBodyValidatePipe()) dto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.insertOne(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category information by id (admin only).' })
  @ApiOkResponse({ type: Category, description: 'Ok' })
  @ApiErrorResponse({
    entity: 'Category',
    withUuidError: true,
    withBodyError: true,
  })
  updateOne(
    @Param('id', uuidValidatePipe('Category')) id: string,
    @Body(reqBodyValidatePipe()) dto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateOne(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete category. Set categoryId to null on associated articles.',
  })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiErrorResponse({
    entity: 'Category',
    withUuidError: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(
    @Param('id', uuidValidatePipe('Category')) id: string,
  ): Promise<void> {
    return this.categoryService.deleteOne(id);
  }
}
