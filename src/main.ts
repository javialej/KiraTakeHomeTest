import sdk from './instrumentation'; // Must import the OpenTelemetry SDK as first line of the main file
import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as rTracer from 'cls-rtracer';
import {ConfigService} from '@nestjs/config';
import {ExceptionManager} from './common/exceptions/exceptions-manager.filter';
import {RestInterceptor} from './common/interceptors/rest.interceptor';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {LoggerService} from './common/logger/logger.service';

async function bootstrap() {
  // Must start the OpenTelemetry SDK before creating the NestJS application
  sdk.start();
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new LoggerService(),
  });

  //Configuración librería para validación de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      skipNullProperties: true,
    })
  );

  //Configuración libreria para generación de indentificador de solicitud
  app.use(rTracer.expressMiddleware());

  //Se carga la configuración
  const config = app.get(ConfigService);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  //Configuración de filter para el manejo de excepciones

  app.useGlobalInterceptors(new RestInterceptor());
  app.useGlobalFilters(new ExceptionManager());

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('MS Payments API')
    .setDescription('The MS Payments API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Inicialización de la aplicación
  const port = config.get<number>('PORT') ?? 3000;
  await app.listen(port, () => {
    const logger = new LoggerService();
    logger.log(`Application is running on: port: ${port}`);
  });
}
void bootstrap();
