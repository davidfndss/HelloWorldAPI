import { BadRequestException, Injectable, Inject, forwardRef } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class EmailAndUsernameValidator {
  @Inject(forwardRef(() => UserService)) 
  private readonly userService: UserService;
  
  async validate ( email: string, username: string ) {
    let verifyIfEmailIsAvailable
    try {
      await this.userService.findUserByEmailService(email)
      verifyIfEmailIsAvailable = false
    } catch {
      verifyIfEmailIsAvailable = true
    }
    if (verifyIfEmailIsAvailable === false) throw new BadRequestException('E-mail already in use')
    let verifyIfUsernameIsAvailable
    try {
      await this.userService.findUserByUsernameService(username)
      verifyIfUsernameIsAvailable = false
    } catch {
      verifyIfUsernameIsAvailable = true
    }
    if (verifyIfUsernameIsAvailable === false) throw new BadRequestException('Username already in use')
    return true
  }
}