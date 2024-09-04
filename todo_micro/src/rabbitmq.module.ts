import { Module, Global } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Global()
@Module({
  providers: [
    {
      provide: 'AUTH_CLIENT',
      useFactory: (): ClientProxy => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://guest:guest@rabbitmq:5672`,
            ],
            queue: 'auth_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
  ],
  exports: ['AUTH_CLIENT'],
})
export class RabbitMQModule {}
