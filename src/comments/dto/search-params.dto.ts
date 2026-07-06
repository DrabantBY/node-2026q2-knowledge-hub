import { IsNotEmpty, IsUUID } from 'class-validator';

export class SearchParamsDto {
  @IsUUID()
  @IsNotEmpty()
  articleId: string;
}
