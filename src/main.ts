import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'; // 1. Importe o ConfigService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Obtenha a instância do ConfigService a partir da aplicação
  const configService = app.get(ConfigService);

  // 3. Pegue a porta do .env (com um valor padrão caso não exista)
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
