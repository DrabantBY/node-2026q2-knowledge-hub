import type { PaginationResponse } from '@common/types';
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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPaginationResponse } from '@swagger/decorators';
import { CommentsService } from './comments.service';
import { ApiCommentQueryParams } from './decorators';
import { CommentSearchParamsDto, CreateCommentDto } from './dto';
import { Comment } from './entities';

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
  @ApiPaginationResponse(Comment)
  fetchList(
    @Query() searchParams: CommentSearchParamsDto,
  ): Promise<PaginationResponse<Comment>> {
    return this.commentService.fetchList(searchParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single comment by id.' })
  @ApiOkResponse({ type: Comment })
  fetchOne(@Param('id', ParseUUIDPipe) id: string): Promise<Comment> {
    return this.commentService.fetchOne(id);
  }

  @Post()
  @ApiOperation({
    summary:
      'Add comment to article (editor can create own, admin can create any).',
  })
  @ApiCreatedResponse({ type: Comment })
  insertOne(@Body() dto: CreateCommentDto): Promise<Comment> {
    return this.commentService.insertOne(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete comment (admin can delete any, editor can delete own).',
  })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.commentService.deleteOne(id);
  }
}
