import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdatePasswordDto, UserSearchParamsDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('Users Api')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users.' })
  fetchAll(@Query() searchParams: UserSearchParamsDto) {
    return this.userService.fetchAll(searchParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single user by id.' })
  fetchOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.fetchOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add new user (admin only).' })
  insertOne(@Body() dto: CreateUserDto) {
    return this.userService.insertOne(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Update user's password by id." })
  updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.userService.updateOne(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      "Delete user by id. Set authorId to null on articles, delete user's comments.",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteOne(id);
  }
}
