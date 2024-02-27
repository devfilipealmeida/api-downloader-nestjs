/* eslint-disable prettier/prettier */
import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Param, Delete } from '@nestjs/common';
import { StoreappService } from './storeapp.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateStoreappDto } from './dto/create-storeapp.dto';

@Controller('storeapp')
export class StoreappController {
  constructor(private readonly storeappService: StoreappService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createStoreAppDto: CreateStoreappDto, @UploadedFile() file: Express.Multer.File) {
    return this.storeappService.create(createStoreAppDto, file);
  }

  @Get('download/:idApp')
  findOne(@Param('idApp') idApp: number) {
    return this.storeappService.findToDownload(idApp);
  }


  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.storeappService.findAll(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.storeappService.remove(id);
  }
}
