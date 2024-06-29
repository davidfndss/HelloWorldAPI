import { Controller, Inject, Post, Body, Request, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client'
import { UserService } from 'src/user/user.service'
import { AuthService } from 'src/auth/auth.service'
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe'
import { AuthSchema } from 'src/auth/schemas/auth.schema'

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @UsePipes(new ZodValidationPipe(AuthSchema))
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signinUser( @Body() userData: Prisma.UserCreateInput ) {
    return this.authService.signinUserService(userData);
  }
}