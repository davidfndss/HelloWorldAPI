import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { UploadsModule } from './upload-image/upload-image.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true, // Torna o módulo de configuração globalmente acessível
  }),
    DatabaseModule,
    UserModule, 
    AuthModule, 
    PostModule, 
    LikeModule, 
    CommentModule, 
    UploadsModule
  ]
})
export class AppModule {}
