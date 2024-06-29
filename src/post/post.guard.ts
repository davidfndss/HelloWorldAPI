import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, NotFoundException, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostService } from 'src/post/post.service'

@Injectable()
export class PostGuard implements CanActivate {
  @Inject()
  private readonly postService: PostService;
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const findPost = await this.postService.findOnePostService(req.params.id)
    if (!findPost) throw new NotFoundException('Post not found')
    if (findPost.userId !== req.user.sub) throw new UnauthorizedException('Unauthorized')

    return true
  }
}
