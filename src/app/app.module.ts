/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { Storeapp } from 'src/storeapp/entities/storeapp.entity';
import { StoreappModule } from 'src/storeapp/storeapp.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'downloader',
      entities: [User, Storeapp],
      synchronize: true,
      logging: true
    }),
    UsersModule,
    StoreappModule,
    MulterModule.register({
      dest: './uploads', // diretório onde os arquivos serão armazenados temporariamente
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
