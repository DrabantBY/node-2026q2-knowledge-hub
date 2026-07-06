import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto';

@Controller('article')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get()
  fetchAll() {
    return this.articleService.fetchAll();
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
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.articleService.deleteOne(id);
  }
}
