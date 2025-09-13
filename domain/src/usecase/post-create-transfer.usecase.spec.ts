import {PostCreateTransferUseCase} from './post-create-transfer.usecase';
import {CreateTransferDto} from '../../../src/adapter/in/http/dto/create-transfer.dto';

describe('PostCreateTransferUseCase', () => {
  let useCase: PostCreateTransferUseCase;

  beforeEach(() => {
    useCase = new PostCreateTransferUseCase();
  });

  it('should return the command', async () => {
    const command: CreateTransferDto = {
      amount: 100,
      vendor: 'test',
      txhash: '0x123',
    };

    const result = await useCase.apply(command);

    expect(result).toEqual(command);
  });
});
