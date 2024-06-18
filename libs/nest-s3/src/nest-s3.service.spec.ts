import { Test, TestingModule } from '@nestjs/testing';
import { NestS3Service } from './nest-s3.service';

describe('NestS3Service', () => {
  let service: NestS3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestS3Service],
    }).compile();

    service = module.get<NestS3Service>(NestS3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
