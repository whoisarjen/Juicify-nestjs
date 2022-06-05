import { Test, TestingModule } from '@nestjs/testing';
import { ConsumedService } from './consumed.service';

describe('ConsumedService', () => {
  let service: ConsumedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumedService],
    }).compile();

    service = module.get<ConsumedService>(ConsumedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
