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
import { CreateUserDto, UpdatePasswordDto, UserSearchParamsDto } from './dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  fetchAll(@Query() searchParams: UserSearchParamsDto) {
    return this.userService.fetchAll(searchParams);
  }

  @Get(':id')
  fetchOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.fetchOne(id);
  }

  @Post()
  insertOne(@Body() dto: CreateUserDto) {
    return this.userService.insertOne(dto);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.userService.updateOne(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteOne(id);
  }
}
