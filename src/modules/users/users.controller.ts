import { Permission } from '@common/decorators';
import {
  reqBodyValidatePipe,
  reqQueryValidatePipe,
  uuidValidatePipe,
} from '@common/pipes';
import type { PaginationResponse } from '@common/types';
import { Role } from '@generated/enums';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiErrorResponse,
  ApiPaginationResponse,
  ApiQueryParams,
} from '@swagger/decorators';
import { USER_SORT_KEY } from './const';
import { CreateUserDto, UpdatePasswordDto, UserSearchParamsDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

@ApiTags('Users Api')
@Permission([Role.ADMIN])
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Permission([Role.VIEWER, Role.EDITOR])
  @Get()
  @ApiOperation({ summary: 'Get all users.' })
  @ApiQueryParams(USER_SORT_KEY)
  @ApiPaginationResponse(User)
  @ApiErrorResponse({ withQueryError: true })
  fetchAll(
    @Query(reqQueryValidatePipe()) searchParams: UserSearchParamsDto,
  ): Promise<PaginationResponse<User>> {
    return this.userService.fetchAll(searchParams);
  }

  @Permission([Role.VIEWER, Role.EDITOR])
  @Get(':id')
  @ApiOperation({ summary: 'Get single user by id.' })
  @ApiOkResponse({ type: User, description: 'Ok' })
  @ApiErrorResponse({ entity: 'User', withUuidError: true })
  fetchOne(@Param('id', uuidValidatePipe('User')) id: string): Promise<User> {
    return this.userService.fetchOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add new user (admin only).' })
  @ApiCreatedResponse({ type: User, description: 'Created' })
  @ApiErrorResponse({ withBodyError: true })
  insertOne(@Body(reqBodyValidatePipe()) dto: CreateUserDto): Promise<User> {
    return this.userService.insertOne(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Update user's password by id." })
  @ApiOkResponse({ type: User, description: 'Ok' })
  @ApiErrorResponse({
    entity: 'User',
    withUuidError: true,
    withBodyError: true,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  updateOne(
    @Param('id', uuidValidatePipe('User')) id: string,
    @Body(reqBodyValidatePipe()) dto: UpdatePasswordDto,
  ): Promise<User> {
    return this.userService.updateOne(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      "Delete user by id. Set authorId to null on articles, delete user's comments.",
  })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiErrorResponse({ entity: 'User', withUuidError: true })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', uuidValidatePipe('User')) id: string): Promise<void> {
    return this.userService.deleteOne(id);
  }
}
