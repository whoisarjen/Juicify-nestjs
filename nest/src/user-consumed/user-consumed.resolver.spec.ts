import { Test, TestingModule } from '@nestjs/testing';
import { UserConsumedResolver } from './user-consumed.resolver';
import { UserConsumedService } from './user-consumed.service';

describe('UserConsumedResolver', () => {
  let resolver: UserConsumedResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserConsumedResolver, UserConsumedService],
    }).compile();

    resolver = module.get<UserConsumedResolver>(UserConsumedResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
