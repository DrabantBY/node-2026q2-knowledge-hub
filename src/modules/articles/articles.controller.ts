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
import { ArticlesService } from './articles.service';
import {
  ArticleSearchParamsDto,
  CreateArticleDto,
  UpdateArticleDto,
} from './dto';

@Controller('article')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get()
  fetchAll(@Query() searchParams: ArticleSearchParamsDto) {
    return this.articleService.fetchAll(searchParams);
  }

  @Get(':id')
  fetchOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.articleService.fetchOne(id);
  }

  @Post()
  insertOne(@Body() dto: CreateArticleDto) {
    return this.articleService.insertOne(dto);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArticleDto,
  ) {
    return this.articleService.updateOne(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.articleService.deleteOne(id);
  }
}
