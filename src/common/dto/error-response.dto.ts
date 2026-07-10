import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    type: 'integer',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    example: 'Internal Server Error',
  })
  error: string;

  @ApiProperty({
    type: String,
    example: 'Something went wrong',
  })
  message: string;
}
