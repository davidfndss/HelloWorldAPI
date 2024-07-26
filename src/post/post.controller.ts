import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Inject, Query, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma, Post as PostModel } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'
import { PostGuard } from 'src/post/post.guard'
import { ISuccessMsg } from 'src/utils/SuccessMsg'
import { Response } from 'express'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: Prisma.PostCreateInput, @Request() req): Promise<PostDto> {
    return this.postService.createPostService({body: data.body, userId: req.user.sub });
  }

  @Get()
  findAll(@Query('offset') offset: string, @Query('limit') limit: string) {
    return this.postService.findAllPostsService(parseInt(offset), parseInt(limit), 'posts')
  }

  @UseGuards(AuthGuard)
  @Get('find-by-id/:id')
  findOne(@Param('id') id: string): Promise<PostDto> {
    return this.postService.findOnePostService(id);
  }

  @UseGuards(AuthGuard, PostGuard)
  @Patch(':id/update')
  update(@Param('id') id: string, @Body() body, @Request() req): Promise<ISuccessMsg>{
    return this.postService.updatePostService(id, body.body, req.user.sub);
  }

  @UseGuards(AuthGuard, PostGuard)
  @Delete(':id/delete')
  remove(@Param('id') id: string): Promise<ISuccessMsg> {
    return this.postService.deletePostService(id);
  }
}
