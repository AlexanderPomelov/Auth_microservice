import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const PORT = process.env.PORT || 8003
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Auth Mircoservice")
    .setDescription("Аuthentication to a separate microservice")
    .setVersion("1.0.0")
    .addTag("Hotels.ru")
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/api/docs", app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://guest:guset@rabbitmq:5672"],
      queue: 'auth_queue',
      queueOptions: {
        durable: false
      }
    }
  })

  await app.startAllMicroservices()
  await app.listen(PORT, () => console.log(`Server started at ${PORT}`));
}
bootstrap();
