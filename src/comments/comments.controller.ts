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
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, SearchParamsDto } from './dto';

@Controller('comment')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  fetchList(@Query() { articleId }: SearchParamsDto) {
    return this.commentService.fetchList(articleId);
  }

  @Post()
  insertOne(@Body() dto: CreateCommentDto) {
    return this.commentService.insertOne(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentService.deleteOne(id);
  }
}
