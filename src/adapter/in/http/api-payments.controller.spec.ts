import {Test, TestingModule} from '@nestjs/testing';
import {ApiPaymentsController} from './api-payments.controller';
import {HTTPResponse} from 'src/model/dto/http-response.model';
import {PostCreateTransferHandler} from '../../../handler/post-create-transfer.handler';

describe('ApiPaymentsController', () => {
  let controller: ApiPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiPaymentsController],
      providers: [
        {
          provide: PostCreateTransferHandler,
          useValue: {
            execute: jest.fn().mockResolvedValue({} as HTTPResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<ApiPaymentsController>(ApiPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
