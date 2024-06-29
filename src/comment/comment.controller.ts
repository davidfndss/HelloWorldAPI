import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UsePipes } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from 'src/comment/dto/comment.dto'
import { Prisma, Comment } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'
import { CommentGuard } from 'src/comment/comment.guard'
import { CommentSchema } from 'src/comment/schemas/comment.schema'
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe'
import { ISuccessMsg } from 'src/utils/SuccessMsg'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(CommentSchema))
  @Post(':postId')
  create(@Body() body: Prisma.CommentCreateInput, @Request() req ): Promise<CommentDto> {
    const postId = req.params.postId
    return this.commentService.create(body.body, postId, req.user.sub);
  }
  
  @UseGuards(AuthGuard, CommentGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<ISuccessMsg> {
    return this.commentService.remove(id);
  }
}
