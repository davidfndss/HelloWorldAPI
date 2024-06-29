import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseModule } from 'src/database/database.module'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  imports: [DatabaseModule],
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
  exports: [CommentService]
})
export class CommentModule {}
