import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ImageFileValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    if (!value) throw new BadRequestException('File type not valid')
    if (value.mimetype !== 'image/jpeg' && value.mimetype !== 'image/png') throw new BadRequestException('File type not valid')
    if (value.size > 5242880) throw new BadRequestException('The file size exceeds the permitted limit of 5mb')
    return value
  }
}