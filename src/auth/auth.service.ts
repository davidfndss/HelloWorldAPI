import { Injectable, Inject, BadRequestException, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  @Inject() 
  private readonly prismaService: PrismaService;
  
  @Inject() 
  private readonly jwtService: JwtService;

  async signinUserService(params: Prisma.UserCreateInput) {
    const user = await this.prismaService.user.findUnique({ where: 
{ email: params.email }})
    if (!user) throw new NotFoundException('User not found')

    const comparePasswords = await bcrypt.compare(params.password, user.password)
    if (!comparePasswords) throw new UnauthorizedException('Invalid credentials')

    const payload = { sub: user.id }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
