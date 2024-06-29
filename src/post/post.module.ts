import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from 'src/database/database.module'
import { UserService } from 'src/user/user.service'
import { EmailAndUsernameValidator } from 'src/utils/EmailAndUsernameValidation'
import { UserModule } from  'src/user/user.module'
import { CommentModule } from 'src/comment/comment.module'
import { LikeModule } from 'src/like/like.module'

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule), CommentModule, LikeModule],
  controllers: [PostController],
  providers: [PostService, UserService, EmailAndUsernameValidator]
})
export class PostModule {}
