import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module'
import { PostModule } from 'src/post/post.module'
import { PostService } from 'src/post/post.service'
import { EmailAndUsernameValidator } from 'src/utils/EmailAndUsernameValidation'
import { CommentService } from 'src/comment/comment.service'
import { LikeService } from 'src/like/like.service'

@Module({
  imports: [DatabaseModule, forwardRef(() => PostModule)],
  controllers: [UserController],
  providers: [UserService, PostService, EmailAndUsernameValidator, CommentService, LikeService],
  exports: [UserService], 
})
export class UserModule {}