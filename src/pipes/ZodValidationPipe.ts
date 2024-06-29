import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (typeof value == 'object') { // It will validates only the data of the Body
      try {
        const parsedValue = this.schema.parse(value);
        return parsedValue;
      } catch (error) {
        const { errors } = error
        throw new BadRequestException(errors.map( (err) => `${err.path[0]}: ${err.message}` ))
      }
    }
  }
}