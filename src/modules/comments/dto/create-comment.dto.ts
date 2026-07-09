import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    type: String,
    example: 'Great article!',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
  })
  @IsUUID()
  @IsNotEmpty()
  articleId: string;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    nullable: true,
    example: '00000000-0000-0000-0000-000000000000',
    default: null,
  })
  @IsUUID()
  @IsOptional()
  authorId?: string | null;
}
