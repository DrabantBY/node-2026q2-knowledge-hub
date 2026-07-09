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
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { ApiCommentQueryParams } from './decorators';
import { CommentSearchParamsDto, CreateCommentDto } from './dto';
import type { Comment } from './entities';

@ApiTags('Comments Api')
@Controller('comment')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Get all comments for a specific article. Requires articleId query parameter.',
  })
  @ApiCommentQueryParams()
  fetchList(
    @Query() searchParams: CommentSearchParamsDto,
  ): Promise<FetchAllResponse<Comment[]>> {
    return this.commentService.fetchList(searchParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single comment by id.' })
  fetchOne(@Param('id', ParseUUIDPipe) id: string): Promise<Comment> {
    return this.commentService.fetchOne(id);
  }

  @Post()
  @ApiOperation({
    summary:
      'Add comment to article (editor can create own, admin can create any).',
  })
  insertOne(@Body() dto: CreateCommentDto): Promise<Comment> {
    return this.commentService.insertOne(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete comment (admin can delete any, editor can delete own).',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.commentService.deleteOne(id);
  }
}
