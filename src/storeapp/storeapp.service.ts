/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateStoreappDto } from './dto/create-storeapp.dto';
import { UpdateStoreappDto } from './dto/update-storeapp.dto';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Storeapp } from './entities/storeapp.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreappService {
  private readonly bucketName: string;
  private readonly storage: Storage;

  constructor(@InjectRepository(Storeapp) private storageAppRepo: Repository<Storeapp>,
  ) {
    this.bucketName = 'files-to-download';
    this.storage = new Storage({
      keyFilename: './application_default_credentials.json',
    });
  }

  create(createStoreAppDto: CreateStoreappDto, file: Express.Multer.File) {
    const fileName = `${Date.now()}_${path.basename(file.originalname)}`;
    const bucket = this.storage.bucket(this.bucketName);
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });
    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        reject(err);
      });

      stream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
        
        const dataToSave = { ...createStoreAppDto, urlStorage: publicUrl, savedName: fileName };

        try {
          const newFile = this.storageAppRepo.create(dataToSave);
          const savedFile = await this.storageAppRepo.save(newFile);
          resolve(savedFile);
        } catch (error) {
          reject(error);
        }

      });

      stream.end(file.buffer);
    });
  }

  async findToDownload(idApp: number) {
    const file = await this.storageAppRepo.findOneBy({ id: idApp })

    if(!file) return 'O arquivo não existe';
    
    try {
      const [existsInBucket] = await this.storage.bucket(this.bucketName).file(file.savedName).exists();

      if (!existsInBucket) return 'O arquivo não está em nuvem, por favor, faça novamente o upload.'
      
      const [authenticatedUrl] = await this.storage.bucket(this.bucketName).file(file.savedName).getSignedUrl({
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000
      });

      return { urlFile: authenticatedUrl }
    } catch (error) {
      console.error('Erro ao gerar URL assinada:', error);
      return 'Erro ao gerar URL assinada';
    }
  }

  findAll(userId: string) {
    return this.storageAppRepo.find({
      where: { userId: userId },
    })
  }
  
  remove(id: number) {
    return this.storageAppRepo.delete({ id });
  }
}
