import { Injectable, Inject, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserSchema } from './schemas/create-user.schema';
import { UpdateUserSchema } from './schemas/update-user.schema';
import { PrismaService } from 'src/database/prisma.service'
import { Prisma, User } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { PostService } from 'src/post/post.service'
import { JwtService } from '@nestjs/jwt'
import { UserDto } from 'src/user/dto/user.dto'
import { ISuccessMsg, SuccessMsg } from 'src/utils/SuccessMsg'
import { EmailAndUsernameValidator } from 'src/utils/EmailAndUsernameValidation'
import { CommentService } from 'src/comment/comment.service'
import { LikeService } from 'src/like/like.service'

@Injectable()
export class UserService {
  @Inject() 
  private readonly prisma: PrismaService;

  @Inject()
  private readonly postService: PostService;

  @Inject() 
  private readonly jwtService: JwtService;

  @Inject()
  private readonly emailAndUsernameValidator: EmailAndUsernameValidator;

  @Inject()
  private readonly commentService: CommentService

  @Inject()
  private readonly likeService: LikeService
  
  async signupUserService(data) {
    // verify if the email is already in use on other account
    await this.emailAndUsernameValidator.validate(data.email, data.username)
    // Encrypts the password, before creating the user on database
    const hashedPassword = await bcrypt.hash(data.password, 10)
    if (!data.name) data.name = data.username
    data.avatar = data.username
    data.background = data.background
    const createdUser = await this.prisma.user.create({ 
      data: {
        ...data, 
        password: hashedPassword
      } 
    })
    const payload = { sub: createdUser.id }
    return {
      message: 'User created successfuly',
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async findUserByIdService(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<UserDto> {
    const foundUser =  await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        posts: {
          include: {
            user: true,
            likes: true,
            comments: true
          }
        }
      }
    })
    if (!foundUser) throw new NotFoundException()
    return {
      name: foundUser.name,
      username: foundUser.username,
      avatar: foundUser.avatar,
      background: foundUser.background,
      posts: foundUser.posts
    }
  }

  async updateUserService(params: {
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  }): Promise<ISuccessMsg> {
    const updatedUser = await this.prisma.user.update({
      where: params.where, 
      data: params.data
    })
    if (!updatedUser) throw new InternalServerErrorException
    return { message: 'User updated successfuly' }
  }

  async deleteUserService(id: Prisma.UserWhereUniqueInput): Promise<ISuccessMsg> {
    // Deletes all the posts of the user, before deleting the user
    await this.postService.deleteAllPostsFromUserService(id.id)
    await this.commentService.deleteAllCommentsFromUserService(id.id)
    await this.likeService.deleteAllLikesFromUserService(id.id)
    await this.prisma.user.delete({
      where: id
    })
    return SuccessMsg("User deleted successfuly")
  }

  async checkEmailAvailabilityService(email: string) {
    if (!email) throw new BadRequestException('Invalid E-mail')
    const foundUser = await this.prisma.user.findUnique({where: {email}})
    return foundUser ? { isAvailable: false } : { isAvailable: true }
  } 
  
  async checkUsernameAvailabilityService(username: string) {
    if (!username) throw new BadRequestException('Invalid username')
    const foundUser = await this.prisma.user.findUnique({where: {username}})
    return foundUser ? { isAvailable: false } : { isAvailable: true }
  }

  async findUserByUsernameService(username: string): Promise<UserDto> {
    if (!username) throw new BadRequestException('Invalid username')
    const foundUser = await this.prisma.user.findUnique({where: {username}})
    return {
      name: foundUser.name,
      username: foundUser.username,
      avatar: foundUser.avatar,
      background: foundUser.background
    }
  }
  
  async findUserByEmailService(email: string): Promise<UserDto> {
    if (!email) throw new BadRequestException('Invalid email')
    const foundUser = await this.prisma.user.findUnique({where: {email}})
    return {
      name: foundUser.name,
      username: foundUser.username,
      avatar: foundUser.avatar,
      background: foundUser.background
    }
  }
}