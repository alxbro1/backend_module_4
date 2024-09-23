import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          if (error.children && error.children.length) {
            return {
              property: error.property,
              children: error.children.map((child) => {
                if (child.children && child.children.length) {
                  return {
                    property: child.property,
                    children: child.children.map((grandchild) => ({
                      property: grandchild.property,
                      constraints: grandchild.constraints,
                    })),
                  };
                }
                return {
                  property: child.property,
                  constraints: child.constraints,
                };
              }),
            };
          }
          return { property: error.property, constraints: error.constraints };
        });

        return new BadRequestException({
          alert: 'Se han detectado los siguientes errores en la petición:',
          errors: cleanErrors,
        });
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Module 4 Backend Project')
  .setDescription('this is de finaly project of the module 4, by Alexander Sauro. Is a e-comerce API, where you can make a CRUD in your products, edit, create and update users account, with yours credentials verify')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const swaggerDocument = SwaggerModule.createDocument(app,swaggerConfig)
  SwaggerModule.setup('doc', app, swaggerDocument)

  await app.listen(3000);
}
bootstrap();
