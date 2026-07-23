import {
  reqBodyValidatePipe,
  reqQueryValidatePipe,
  uuidValidatePipe,
} from '@common/pipes';

import type { PaginationResponse } from '@common/types';
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
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ApiErrorResponse, ApiPaginationResponse } from '@swagger/decorators';
import { ArticlesService } from './articles.service';
import { ApiArticleQueryParams } from './decorators';
import {
  ArticleSearchParamsDto,
  CreateArticleDto,
  UpdateArticleDto,
} from './dto';
import { Article } from './entities';

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
  @ApiPaginationResponse(Article)
  @ApiErrorResponse({ withQueryError: true })
  fetchAll(
    @Query(reqQueryValidatePipe()) searchParams: ArticleSearchParamsDto,
  ): Promise<PaginationResponse<Article>> {
    return this.articleService.fetchAll(searchParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single article by id.' })
  @ApiOkResponse({ type: Article, description: 'Ok' })
  @ApiErrorResponse({ entity: 'Article', withUuidError: true })
  fetchOne(
    @Param('id', uuidValidatePipe('Article')) id: string,
  ): Promise<Article> {
    return this.articleService.fetchOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new article (editor can create own, admin can create any).',
  })
  @ApiCreatedResponse({ type: Article, description: 'Created' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
  @ApiErrorResponse({ withBodyError: true })
  insertOne(
    @Body(reqBodyValidatePipe()) dto: CreateArticleDto,
  ): Promise<Article> {
    return this.articleService.insertOne(dto);
  }

  @Put(':id')
  @ApiOperation({
    summary:
      'Update article by id (editor can update own, admin can update any).',
  })
  @ApiOkResponse({ type: Article, description: 'Ok' })
  @ApiErrorResponse({
    entity: 'Article',
    withUuidError: true,
    withBodyError: true,
  })
  updateOne(
    @Param('id', uuidValidatePipe('Article')) id: string,
    @Body(reqBodyValidatePipe()) dto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.updateOne(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete article. Delete all associated comments (admin only).',
  })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiErrorResponse({
    entity: 'Article',
    withUuidError: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(
    @Param('id', uuidValidatePipe('Article')) id: string,
  ): Promise<void> {
    return this.articleService.deleteOne(id);
  }
}
