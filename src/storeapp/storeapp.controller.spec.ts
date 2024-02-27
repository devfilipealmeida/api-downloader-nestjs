import { Test, TestingModule } from '@nestjs/testing';
import { StoreappController } from './storeapp.controller';
import { StoreappService } from './storeapp.service';

describe('StoreappController', () => {
  let controller: StoreappController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreappController],
      providers: [StoreappService],
    }).compile();

    controller = module.get<StoreappController>(StoreappController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
