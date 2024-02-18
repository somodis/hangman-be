import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Hangman Game')
    .setDescription('Hangman Game BE API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Hangman Game API',
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('', app, document, customOptions);

  app.enableCors({ origin: 'http://localhost:3000', credentials: true });

  await app.listen(3001);
}
bootstrap();
