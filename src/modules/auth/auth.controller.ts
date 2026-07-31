import { User } from '@common/entities';
import { reqBodyValidatePipe } from '@common/pipes';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '@swagger/decorators';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('Auth Api')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user.' })
  @ApiCreatedResponse({ type: User, description: 'Created' })
  @ApiErrorResponse({
    entity: 'User',
    withBodyError: true,
  })
  @Post('signup')
  signup(@Body(reqBodyValidatePipe()) dto: AuthDto): Promise<User> {
    return this.authService.signup(dto);
  }
}
