import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UsePipes, UseGuards, Request } from '@nestjs/common';
import { UploadsService } from './upload-image.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { FileInterceptor } from '@nestjs/platform-express'
import { ImageFileValidatorPipe } from 'src/pipes/ImageFileValidationPipe'
import { AuthGuard } from 'src/auth/auth.guard'
import { SuccessMsg, ISuccessMsg } from 'src/utils/SuccessMsg'

@Controller('user/update-image')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Patch('avatar')
  @UseGuards(AuthGuard)
  @UsePipes(ImageFileValidatorPipe)
  @UseInterceptors(FileInterceptor('image'))
  uploadAvatarImage(@UploadedFile() image: UploadImageDto, @Request() req): Promise<ISuccessMsg> {
    return this.uploadsService.uploadImageService(image, req.user.sub, 'avatar')
  }
  
  @Patch('background')
  @UseGuards(AuthGuard)
  @UsePipes(ImageFileValidatorPipe)
  @UseInterceptors(FileInterceptor('image'))
  uploadBackgroundImage(@UploadedFile() image: UploadImageDto, @Request() req): Promise<ISuccessMsg> {
    return this.uploadsService.uploadImageService(image, req.user.sub, 'background')
  }
}
