import {Test, TestingModule} from '@nestjs/testing';
import {ApiPaymentsController} from './api-payments.controller';
import {HTTPResponse} from 'src/model/dto/http-response.model';
import {PostCreateTransferHandler} from '../../../handler/post-create-transfer.handler';
import {CreateTransferDto} from './dto/create-transfer.dto';

describe('ApiPaymentsController', () => {
  let controller: ApiPaymentsController;
  let handler: PostCreateTransferHandler;

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
    handler = module.get<PostCreateTransferHandler>(PostCreateTransferHandler);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the handler with the correct arguments', async () => {
    const dto: CreateTransferDto = {
      amount: 100,
      txhash: '0x123',
    };
    await controller.postCreateTransfer(dto);
    expect(handler.execute).toHaveBeenCalledWith(dto);
  });
});
