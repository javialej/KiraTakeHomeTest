import {Test, TestingModule} from '@nestjs/testing';
import {PostCreateTransferHandler} from './post-create-transfer.handler';
import {PostCreateTransferUseCase} from '../../domain/src/usecase/post-create-transfer.usecase';
import {PostCreateTransferMapper} from '../model/mapper/post-create-transfer.mapper';
import {HTTPResponse} from '../model/dto/http-response.model';
import {SUCCESS_STATES_MESSAGES} from '../common/response-states/success-states.messages';
import {HttpStatus} from '@nestjs/common';
import {CreateTransferDto} from '../adapter/in/http/dto/create-transfer.dto';

describe('PostCreateTransferHandler', () => {
  let handler: PostCreateTransferHandler;
  let useCase: PostCreateTransferUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostCreateTransferHandler,
        {
          provide: 'PostCreateTransferUseCase',
          useValue: {
            apply: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<PostCreateTransferHandler>(PostCreateTransferHandler);
    useCase = module.get<PostCreateTransferUseCase>('PostCreateTransferUseCase');
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return a successful HTTP response', async () => {
    const request: CreateTransferDto = {
      amount: 100,
      vendor: 'test',
      txhash: '0x123',
    };
    const response: CreateTransferDto = {
      amount: 100,
      vendor: 'test',
      txhash: '0x123',
    };

    jest.spyOn(PostCreateTransferMapper, 'toModel').mockReturnValue(request);
    jest.spyOn(useCase, 'apply').mockResolvedValue(request);
    jest.spyOn(PostCreateTransferMapper, 'toDTO').mockReturnValue(response);

    const result = await handler.execute(request);

    expect(result).toEqual(
      new HTTPResponse(
        HttpStatus.CREATED,
        SUCCESS_STATES_MESSAGES.Success.code,
        'Transfer created successfully',
        response,
      ),
    );
  });
});
