import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Request as NestRequest, UnauthorizedException } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client'
import { UserService } from './user.service';
import { CreateUserSchema } from './schemas/create-user.schema';
import { UpdateUserSchema } from './schemas/update-user.schema';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe'
import { AuthGuard } from 'src/auth/auth.guard'
import { UserGuard } from 'src/user/user.guard'
import { Request } from 'express'
import { UserDto } from 'src/user/dto/user.dto'
import { ISuccessMsg } from 'src/utils/SuccessMsg'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  @Post('/signup')
  async signupUser( @Body() userData: Prisma.UserCreateInput ): Promise<{ message, access_token }> {
    return this.userService.signupUserService(userData);
  }

  @UseGuards(AuthGuard)
  @Get('find-by-id/:id')
  findUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findUserByIdService({id});
  }

  // I found some problems using the decorator @param('id'), so I used this method to handle the parameters of the request
  @UseGuards(AuthGuard, UserGuard)
  @UsePipes(new ZodValidationPipe(UpdateUserSchema))
  @Patch(':id/update')
  updateUser(@NestRequest() req: Request, @Body() userData: Prisma.UserUpdateInput): Promise<ISuccessMsg> {
    return this.userService.updateUserService({where: {id: req.params.id}, data: userData});
  }

  @UseGuards(AuthGuard, UserGuard)
  @Delete(':id/delete')
  deleteUser(@Param('id') id: string): Promise<ISuccessMsg> {
    return this.userService.deleteUserService({id});
  }

  @Post('check-email')
  checkEmailAvailability(@Body('email') email: string): Promise<{isAvailable: boolean}> {
    return this.userService.checkEmailAvailabilityService(email)
  }
  
  @Post('check-username')
  checkUsernameAvailability(@Body('username') username: string): Promise<{isAvailable: boolean}> {
    return this.userService.checkUsernameAvailabilityService(username)
  }

  @UseGuards(AuthGuard)
  @Get('find-by-username/:username')
  findUserByUsername(@Param('username') username: string): Promise<UserDto> {
      return this.userService.findUserByUsernameService(username)
  }
}