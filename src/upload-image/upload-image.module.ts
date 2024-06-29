import { Module } from '@nestjs/common';
import { UploadsService } from './upload-image.service';
import { UploadsController } from './upload-image.controller';
import { DatabaseModule } from 'src/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [UploadsController],
  providers: [UploadsService]
})
export class UploadsModule {}
