import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // NOTE: no global ValidationPipe is registered (intentional for this fixture).
  await app.listen(3000);
}
bootstrap();
