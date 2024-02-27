/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StoreappService } from './storeapp.service';
import { StoreappController } from './storeapp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storeapp } from './entities/storeapp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Storeapp])],
  controllers: [StoreappController],
  providers: [StoreappService],
})
export class StoreappModule {}
