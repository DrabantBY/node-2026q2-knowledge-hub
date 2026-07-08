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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CommentSearchParamsDto, CreateCommentDto } from './dto';

@ApiTags('Comments Api')
@Controller('comment')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Get all comments for a specific article. Requires articleId query parameter.',
  })
  fetchList(@Query() searchParams: CommentSearchParamsDto) {
    return this.commentService.fetchList(searchParams);
  }

  @Post()
  @ApiOperation({
    summary:
      'Add comment to article (editor can create own, admin can create any).',
  })
  insertOne(@Body() dto: CreateCommentDto) {
    return this.commentService.insertOne(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete comment (admin can delete any, editor can delete own).',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentService.deleteOne(id);
  }
}
