import { StatusCodes } from 'http-status-codes';
import {
  Authorized,
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { DI } from '~/core';

import type { AuthService } from './';
import {
  AuthConfirmEmailDto,
  AuthForgotPasswordDto,
  AuthResetPasswordDto,
  EmailSignInDto,
  SignUpDto,
} from './dto';

@JsonController('/auth/')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = DI.instance.authService;
  }

  @Post('email/sign-in')
  @HttpCode(StatusCodes.OK)
  public signIn(@Body() loginDto: EmailSignInDto) {
    return this.authService.signIn(loginDto, false);
  }

  @Post('email/admin/sign-in')
  @HttpCode(StatusCodes.OK)
  public adminSignIn(@Body() _loginDTO: EmailSignInDto) {
    // return this.authService.signIn(loginDTO, true);
  }

  @Post('email/sign-up')
  @HttpCode(StatusCodes.CREATED)
  signUp(@Body() createUserDto: SignUpDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('confirm-email')
  @HttpCode(StatusCodes.OK)
  confirmEmail(@Body() _confirmEmailDto: AuthConfirmEmailDto) {
    // return this.authService.confirmEmail(confirmEmailDto.hash);
  }

  @Post('forgot-password')
  @HttpCode(StatusCodes.OK)
  forgotPassword(@Body() _forgotPasswordDto: AuthForgotPasswordDto) {
    // return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  @HttpCode(StatusCodes.OK)
  resetPassword(@Body() _resetPasswordDto: AuthResetPasswordDto) {
    // return this.authService.resetPassword(
    //   resetPasswordDto.hash,
    //   resetPasswordDto.password,
    // );
  }

  @Authorized()
  @Get('me')
  @HttpCode(StatusCodes.OK)
  public me() {
    // return this.authService.me(request.user);
  }

  // @Authorized()
  // @Patch('me')
  // @HttpCode(StatusCodes.OK)
  // public update(@Body() _userDto: AuthUpdateDto) {
  //   // return this.authService.update(request.user, userDto);
  // }

  @Authorized()
  @Delete('me')
  @HttpCode(StatusCodes.OK)
  public delete() {
    // return this.authService.softDelete(request.user);
  }
}
