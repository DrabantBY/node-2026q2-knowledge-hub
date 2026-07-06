export class Comment {
  id: string;
  content: string;
  articleId: string;
  authorId: string | null;
  createdAt: number;

  constructor(data: Partial<Comment>) {
    Object.assign(this, data);
  }
}
