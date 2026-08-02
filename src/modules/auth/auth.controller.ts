import { PublicRoute } from '@common/decorators';
import { reqBodyValidatePipe } from '@common/pipes';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiErrorResponse } from '@swagger/decorators';
import { AuthService } from './auth.service';
import { AuthDto, TokenRefreshDto } from './dto';
import { TokenAuth } from './entities';

@ApiTags('Auth Api')
@PublicRoute()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ThrottlerGuard)
  @Post('signup')
  @ApiOperation({ summary: 'Sign up as a new user.' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiErrorResponse({
    entity: 'User',
    withBodyError: true,
  })
  signup(@Body(reqBodyValidatePipe()) dto: AuthDto): Promise<void> {
    return this.authService.signup(dto);
  }

  @UseGuards(ThrottlerGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in as an existing user.' })
  @ApiOkResponse({ type: TokenAuth, description: 'Authenticated' })
  @ApiErrorResponse({
    entity: 'User',
    withBodyError: true,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  signin(@Body(reqBodyValidatePipe()) dto: AuthDto): Promise<TokenAuth> {
    return this.authService.signin(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resfresh token' })
  @ApiOkResponse({ type: TokenAuth, description: 'Refreshed' })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  refresh(@Body() { refreshToken }: TokenRefreshDto): Promise<TokenAuth> {
    return this.authService.refresh(refreshToken);
  }
}
