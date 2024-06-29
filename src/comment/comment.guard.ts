import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, NotFoundException, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class CommentGuard implements CanActivate {
  @Inject()
  private readonly prisma: PrismaService;

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const findComment = await this.prisma.comment.findUnique({ where: {id: req.params.id}})
    if (!findComment) throw new NotFoundException('Comment not found')
    if (findComment.userId !== req.user.sub) throw new UnauthorizedException('Unauthorized')

    return true
  }
}