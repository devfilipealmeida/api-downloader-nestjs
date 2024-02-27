import { Test, TestingModule } from '@nestjs/testing';
import { StoreappService } from './storeapp.service';

describe('StoreappService', () => {
  let service: StoreappService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreappService],
    }).compile();

    service = module.get<StoreappService>(StoreappService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
