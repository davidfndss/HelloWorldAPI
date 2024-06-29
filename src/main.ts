import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from './swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger Documentation
  swaggerSetup(app)
  await app.listen(3000);
}
bootstrap();