import {Test, TestingModule} from '@nestjs/testing';
import {PaymentsDataBaseRepository} from './payments-database.controller';
import {ConfigService} from '@nestjs/config';

jest.mock('./client.connection', () => ({
  firestoreClient: {
    collection: jest.fn(() => ({
      doc: jest.fn(),
    })),
  },
}));

describe('PaymentsDataBaseRepository', () => {
  let repository: PaymentsDataBaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsDataBaseRepository,
        {
          provide: ConfigService, // Mock its dependency
          useValue: {
            get: jest.fn().mockReturnValue('test-collection'),
          },
        },
      ],
    }).compile();

    repository = module.get<PaymentsDataBaseRepository>(
      PaymentsDataBaseRepository
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
