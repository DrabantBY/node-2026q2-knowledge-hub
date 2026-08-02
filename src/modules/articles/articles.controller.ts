import { Permission, User } from '@common/decorators';
import {
  reqBodyValidatePipe,
  reqQueryValidatePipe,
  uuidValidatePipe,
} from '@common/pipes';
import type { PaginationResponse, UserPayload } from '@common/types';
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
  ApiBearerAuth,
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
@Permission([Role.ADMIN])
@ApiBearerAuth()
@Controller('article')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Permission([Role.VIEWER, Role.EDITOR])
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

  @Permission([Role.VIEWER, Role.EDITOR])
  @Get(':id')
  @ApiOperation({ summary: 'Get single article by id.' })
  @ApiOkResponse({ type: Article, description: 'Ok' })
  @ApiErrorResponse({ entity: 'Article', withUuidError: true })
  fetchOne(
    @Param('id', uuidValidatePipe('Article')) id: string,
  ): Promise<Article> {
    return this.articleService.fetchOne(id);
  }

  @Permission([Role.EDITOR])
  @Post()
  @ApiOperation({
    summary: 'Add new article (editor can create own, admin can create any).',
  })
  @ApiCreatedResponse({ type: Article, description: 'Created' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
  @ApiErrorResponse({ withBodyError: true })
  insertOne(
    @Body(reqBodyValidatePipe()) dto: CreateArticleDto,
    @User() user: UserPayload,
  ): Promise<Article> {
    return this.articleService.insertOne(dto, user);
  }

  @Permission([Role.EDITOR])
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
    @User() user: UserPayload,
  ): Promise<Article> {
    return this.articleService.updateOne(id, dto, user);
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
