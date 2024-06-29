import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UsePipes } from '@nestjs/common';
import { LikeService } from './like.service';
import { Prisma, Like } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'
import { ISuccessMsg } from 'src/utils/SuccessMsg'
 
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(AuthGuard)
  @Post('post/:id')
  likePost(@Request() req): Promise<ISuccessMsg> {
    const postId = req.params.id
    return this.likeService.likePostService(postId, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('comment/:id')
  likeComment(@Request() req): Promise<ISuccessMsg> {
    const commentId = req.params.id
    return this.likeService.likeCommentService(commentId, req.user.sub);
  }
}
