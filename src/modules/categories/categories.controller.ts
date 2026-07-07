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
import { CategoriesService } from './categories.service';
import {
  CategorySearchParamsDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  fetchAll(@Query() searchParams: CategorySearchParamsDto) {
    return this.categoryService.fetchAll(searchParams);
  }

  @Get(':id')
  fetchOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.fetchOne(id);
  }

  @Post()
  insertOne(@Body() dto: CreateCategoryDto) {
    return this.categoryService.insertOne(dto);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateOne(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.deleteOne(id);
  }
}
