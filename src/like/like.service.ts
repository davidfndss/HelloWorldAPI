import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service'
import { SuccessMsg, ISuccessMsg } from 'src/utils/SuccessMsg'
import { Prisma } from '@prisma/client'

@Injectable()
export class LikeService {
  @Inject()
  private readonly prisma: PrismaService;

  async likePostService(postId: string, userId: string): Promise<ISuccessMsg> {
    const foundPost = await this.prisma.post.findUnique({ 
      where: { id: postId }, 
      include: { 
        likes: true, 
        comments: true 
      } 
    })
    const LikesList = foundPost.likes
    
    const findLikeOnPost = LikesList.find((obj) => obj.userId === userId)
    if (findLikeOnPost) {
      await this.prisma.like.delete({where: {
        id: findLikeOnPost.id
      }})
      return SuccessMsg('Like removed from post')
    }
    await this.prisma.like.create({
      data: {
        userId: userId,
        postId: postId
      }
    })
    return SuccessMsg('Post liked')
  }
  
  async likeCommentService(commentId: string, userId: string): Promise<ISuccessMsg> {
    const foundComment = await this.prisma.comment.findUnique({ 
      where: { id: commentId }, 
      include: { 
        likes: true
      } 
    })
    const LikesList = foundComment.likes

    const findLikeOnComment = LikesList.find((obj) => obj.userId === userId)
    if (findLikeOnComment) {
      await this.prisma.like.delete({where: {
        id: findLikeOnComment.id
      }})
      return SuccessMsg('Like removed')
    }
    await this.prisma.like.create({
      data: {
        userId,
        commentId
      }
    })
    return SuccessMsg('Comment liked')
  }

  async deleteAllLikesFromUserService(userId: string): Promise<ISuccessMsg> {
    await this.prisma.post.deleteMany({ where: {userId: userId}});
    return SuccessMsg('All likes from user deleted')
  }
}
