import type { PaginationResponse, UserPayload } from '@common/types';
import { idNotFoundMessage } from '@common/utils';
import { Prisma } from '@generated/client';
import { Role } from '@generated/enums';
import type { CommentModel } from '@generated/models';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import type { CommentSearchParamsDto, CreateCommentDto } from './dto';
import { Comment } from './entities';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async fetchList({
    articleId,
    sortBy,
    order,
    page,
    limit,
  }: CommentSearchParamsDto): Promise<PaginationResponse<Comment>> {
    const orderBy: Prisma.CommentOrderByWithRelationInput | undefined =
      sortBy && order ? { [sortBy]: order } : undefined;

    const [comments, total] = await this.prismaService.$transaction([
      this.prismaService.comment.findMany({
        where: { articleId },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.comment.count({ where: { articleId } }),
    ]);

    return {
      data: comments.map(this.mapToComment),
      page,
      limit,
      total,
    };
  }

  async fetchOne(id: string): Promise<Comment> {
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
    });

    if (!comment) throw new NotFoundException(idNotFoundMessage('Comment'));

    return this.mapToComment(comment);
  }

  async insertOne(
    data: CreateCommentDto,
    { userId, role }: UserPayload,
  ): Promise<Comment> {
    if (role === Role.EDITOR && userId !== data.authorId)
      throw new ForbiddenException();
    try {
      const comment = await this.prismaService.comment.create({
        data,
      });
      return this.mapToComment(comment);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2003'
      )
        throw new UnprocessableEntityException(
          "ArticleId or authorId reference doesn't exist",
        );
      else throw err;
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await this.prismaService.comment.delete({
        where: { id },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      )
        throw new NotFoundException(idNotFoundMessage('Comment'));
      else throw err;
    }
  }

  private mapToComment(comment: CommentModel): Comment {
    return new Comment({
      ...comment,
      createdAt: comment.createdAt.getTime(),
    });
  }
}
