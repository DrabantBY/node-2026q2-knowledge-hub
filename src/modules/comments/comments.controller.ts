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
import { CommentSearchParamsDto, CreateCommentDto } from './dto';

@Controller('comment')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  fetchList(@Query() searchParams: CommentSearchParamsDto) {
    return this.commentService.fetchList(searchParams);
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
