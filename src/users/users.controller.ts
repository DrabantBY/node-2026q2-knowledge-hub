import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  fetchAll() {
    return this.userService.fetchAll();
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
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteOne(id);
  }
}
