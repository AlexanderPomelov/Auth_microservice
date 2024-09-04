import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.enity';
import { RabbitMQModule } from './rabbitmq.module';



@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `auth_microsevice/.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.AUTH_POSTGRES_LOCAL || 'auth-db',
      port: Number(process.env.AUTH_POSTGRES_PORT) ||  5432,
      username: process.env.AUTH_POSTGRES_NAME || "postgres",
      password: process.env.AUTH_POSTGRES_PASSWORD,
      database: process.env.AUTH_POSTGRES_DB || "auth_micro",
      entities: [Users],
      synchronize: true,
      autoLoadEntities: true
    }),
    AuthModule,
    UsersModule,
    RabbitMQModule
  ],
})
export class AppModule {}
