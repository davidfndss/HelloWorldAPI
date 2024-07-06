import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from './swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Swagger Documentation
  swaggerSetup(app)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
