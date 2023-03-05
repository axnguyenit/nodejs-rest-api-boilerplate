import { IsEmail, IsNotEmpty } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Patch,
  Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { DI } from '~/providers/di';

import type { AuthService } from './auth.interface';
import {
  AuthConfirmEmailDto,
  AuthEmailLoginDto,
  AuthForgotPasswordDto,
  AuthRegisterDto,
  AuthResetPasswordDto,
  AuthUpdateDto,
} from './dto';

export class UserResponse {
  id!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
@JsonController('/auth')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = DI.instance.authService;
  }

  @Post('/email/login')
  @HttpCode(StatusCodes.OK)
  async login(
    @Body({
      validate: {
        whitelist: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
      },
    })
    loginDto: AuthEmailLoginDto,
  ) {
    return this.authService.validateLogin(loginDto, false);
  }

  @Post('/admin/email/login')
  @HttpCode(StatusCodes.OK)
  adminLogin(@Body() loginDTO: AuthEmailLoginDto) {
    return this.authService.validateLogin(loginDTO, true);
  }

  @Post('/email/register')
  @HttpCode(StatusCodes.CREATED)
  register(@Body() createUserDto: AuthRegisterDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/email/confirm')
  @HttpCode(StatusCodes.OK)
  confirmEmail(@Body() _confirmEmailDto: AuthConfirmEmailDto) {
    // return this.authService.confirmEmail(confirmEmailDto.hash);
  }

  @Post('/forgot/password')
  @HttpCode(StatusCodes.OK)
  forgotPassword(@Body() forgotPasswordDto: AuthForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('/reset/password')
  @HttpCode(StatusCodes.OK)
  resetPassword(@Body() _resetPasswordDto: AuthResetPasswordDto) {
    // return this.authService.resetPassword(
    //   resetPasswordDto.hash,
    //   resetPasswordDto.password,
    // );
  }

  @Authorized()
  @Get('/me')
  @HttpCode(StatusCodes.OK)
  me() {
    // return this.authService.me(request.user);
  }

  @Authorized()
  @Patch('/me')
  @HttpCode(StatusCodes.OK)
  update(@Body() _userDto: AuthUpdateDto) {
    // return this.authService.update(request.user, userDto);
  }

  @Authorized()
  @Delete('/me')
  @HttpCode(StatusCodes.OK)
  delete() {
    // return this.authService.softDelete(request.user);
  }

  @Authorized()
  @Post('/check')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  check(@CurrentUser() user: any): any {
    return user;
  }
}
