import type { FetchAllResponse } from '@common/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import {
  CategorySearchParamsDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';
import type { Category } from './entities';

@ApiTags('Categories Api')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories.' })
  fetchAll(
    @Query() searchParams: CategorySearchParamsDto,
  ): Promise<FetchAllResponse<Category[]>> {
    return this.categoryService.fetchAll(searchParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single category by id.' })
  fetchOne(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
    return this.categoryService.fetchOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add new category (admin only).' })
  insertOne(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.insertOne(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category information by id (admin only).' })
  updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateOne(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete category. Set categoryId to null on associated articles.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.categoryService.deleteOne(id);
  }
}
