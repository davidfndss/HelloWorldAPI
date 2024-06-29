import { Injectable, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/database/prisma.service'
import { Prisma, Post } from '@prisma/client'
import { SuccessMsg, ISuccessMsg } from 'src/utils/SuccessMsg'
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  @Inject() 
  private readonly prisma: PrismaService;

  async createPostService(data: {body: string, userId: string}): Promise<PostDto> {
    const { body, userId } = data
    const createdPost =  await this.prisma.post.create({
      data: {
        body: body,
        user: {
          connect: {
            id: userId
          }
        },
        likes: {
          create: []
        },
        comments: {
          create: []
        }
      },
      include: {
        user: true,
        comments: true,
        likes: true
      }
    })
    return {
      id: createdPost.id,
      body: createdPost.body,
      user: {
        username: createdPost.user.username,
        name: createdPost.user.name,
        avatar: createdPost.user.avatar,
      },
      comments: [],
      likes: [],
    }
  }

  async findAllPostsService(offset: number, limit: number, currentUrl: string) {
    if (!offset) offset = 0
    if (!limit) limit = 20
    const posts = await this.prisma.post.findMany({
      skip: offset,
      take: limit,
      include: {
        user: true,
        likes: true,
        comments: true
      },
    });
    
    const total = await this.prisma.post.count();

    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

    return {
      nextUrl,
      previousUrl,
      offset,
      limit,
      total,
      results: posts.map((item) => ({
        id: item.id,
        body: item.body,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.username,
        avatar: item.user.avatar,
      })),
    };
  }

  async findOnePostService(id: string): Promise<PostDto> {
    const foundPost = await this.prisma.post.findUnique({
      where: {id},
      include: {
        user: true,
        comments: {
          include: {
            user: true
          }  
        },
        likes: true
      }
    })
    return {
      id: foundPost.id,
      body: foundPost.body,
      user: {
        name: foundPost.user.name,
        username: foundPost.user.username,
        avatar: foundPost.user.avatar
      },
      comments: foundPost.comments,
      likes: foundPost.likes,
    }
  }

  async updatePostService(id: string, body: string, userId: string): Promise<ISuccessMsg> {
    const updatedPost = await this.prisma.post.update({
      where: {id},
      data: {
        body,
        user: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        comments: true,
        likes: true
      }
    }) 
    return SuccessMsg('Post updated successfuly')
  }

  async deletePostService(id: string): Promise<ISuccessMsg> {
    await this.prisma.post.delete({ where: {id}});
    return SuccessMsg('Post deleted')
  }

  async deleteAllPostsFromUserService(userId: string): Promise<ISuccessMsg> {
    await this.prisma.post.deleteMany({ where: {userId: userId}});
    return SuccessMsg('All posts from user deleted')
  }
}
