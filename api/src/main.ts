import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { json } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT;
  const host = process.env.SYSTEM_HOST;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.use(json({ limit: '2mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.map((error) => {
          const constraints = error.constraints;
          const keys = Object.keys(constraints);
          return {
            [error.property]: keys.map((key) => constraints[key]),
          };
        });
        return new UnprocessableEntityException({
          errors: errorMessages.reduce(
            (acc, error) => ({ ...acc, ...error }),
            {},
          ),
        });
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Finance App')
    .setDescription('Finance app API description ')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(port);

  Logger.log(`Server is Running(🔥) on http://${host}:${port}/`, 'Finance app');
  Logger.log(
    `Swagger API Collection(🔥) on http://${host}:${port}/api-doc/`,
    'Finance app',
  );
}
bootstrap();
