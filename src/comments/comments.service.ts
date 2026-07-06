import { randomUUID } from 'node:crypto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import type { CreateCommentDto } from './dto';
import { Comment } from './entities';

@Injectable()
export class CommentsService {
  #store: Comment[] = [];

  fetchList(id: string) {
    const list = this.#store.filter(({ articleId }) => articleId === id);
    if (list.length === 0)
      throw new UnprocessableEntityException(
        "ArticleId reference doesn't exist",
      );
    return list;
  }

  insertOne(dto: CreateCommentDto): Comment {
    const comment = new Comment({
      id: randomUUID(),
      ...dto,
      authorId: dto.authorId ?? null,
      createdAt: Date.now(),
    });
    this.#store.push(comment);

    return comment;
  }

  deleteOne(id: string): void {
    const isExist = this.#store.some((comment) => comment.id === id);
    if (!isExist) {
      throw new NotFoundException("Comment doesn't exist");
    }
    this.#store = this.#store.filter((comment) => comment.id !== id);
  }
}
