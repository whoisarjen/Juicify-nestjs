import { Test, TestingModule } from '@nestjs/testing';
import { DailiesResolver } from './dailies.resolver';
import { DailiesService } from './dailies.service';

describe('DailiesResolver', () => {
  let resolver: DailiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailiesResolver, DailiesService],
    }).compile();

    resolver = module.get<DailiesResolver>(DailiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
