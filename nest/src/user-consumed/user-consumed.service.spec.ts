import { Test, TestingModule } from '@nestjs/testing';
import { UserConsumedService } from './user-consumed.service';

describe('UserConsumedService', () => {
  let service: UserConsumedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserConsumedService],
    }).compile();

    service = module.get<UserConsumedService>(UserConsumedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
