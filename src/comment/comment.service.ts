import { Injectable, Inject } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { PrismaService } from 'src/database/prisma.service'
import { SuccessMsg, ISuccessMsg } from 'src/utils/SuccessMsg'
import { LikeDto } from 'src/like/dto/like.dto'

@Injectable()
export class CommentService {
  @Inject()
  private readonly prisma: PrismaService;
  
  async create(body: string, postId: string, userId: string): Promise<CommentDto> {
    const createdComment = await this.prisma.comment.create({
      data: {
        body,
        post: {
          connect: {
            id: postId
          }
        },
        user: {
          connect: {
            id: userId
          }
        },
        likes: {
          create: []
        }
      },
      include: {
        user: true
      }
    })

    return {
      id: createdComment.id,
      body: createdComment.body,
      postId: createdComment.postId,
      likes: [],
      user: {
        name: createdComment.user.name,
        username: createdComment.user.username,
        avatar: createdComment.user.avatar
      }
    }
  }

  async remove(id: string): Promise<ISuccessMsg> {
    await this.prisma.comment.delete({ where: {id} });
    return SuccessMsg('Comment deleted')
  }

  async deleteAllCommentsFromUserService(userId: string): Promise<ISuccessMsg> {
    await this.prisma.comment.deleteMany({ where: {userId: userId}});
    return SuccessMsg('All comments from user deleted')
  }
}
