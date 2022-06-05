import { Test, TestingModule } from '@nestjs/testing';
import { ConsumedResolver } from './consumed.resolver';
import { ConsumedService } from './consumed.service';

describe('ConsumedResolver', () => {
  let resolver: ConsumedResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumedResolver, ConsumedService],
    }).compile();

    resolver = module.get<ConsumedResolver>(ConsumedResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
