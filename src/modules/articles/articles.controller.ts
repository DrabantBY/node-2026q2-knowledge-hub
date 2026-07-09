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
import { ArticlesService } from './articles.service';
import { ApiArticleQueryParams } from './decorators';
import {
  ArticleSearchParamsDto,
  CreateArticleDto,
  UpdateArticleDto,
} from './dto';
import type { Article } from './entities';

@ApiTags('Articles Api')
@Controller('article')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get()
  @ApiOperation({
    summary:
      'Get all articles. Supports filtering by status, categoryId, and tag.',
  })
  @ApiArticleQueryParams()
  fetchAll(
    @Query() searchParams: ArticleSearchParamsDto,
  ): Promise<FetchAllResponse<Article[]>> {
    return this.articleService.fetchAll(searchParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single article by id.' })
  fetchOne(@Param('id', ParseUUIDPipe) id: string): Promise<Article> {
    return this.articleService.fetchOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new article (editor can create own, admin can create any).',
  })
  insertOne(@Body() dto: CreateArticleDto): Promise<Article> {
    return this.articleService.insertOne(dto);
  }

  @Put(':id')
  @ApiOperation({
    summary:
      'Update article by id (editor can update own, admin can update any).',
  })
  updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.updateOne(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete article. Delete all associated comments (admin only).',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.articleService.deleteOne(id);
  }
}
