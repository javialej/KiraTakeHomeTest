import {Test, TestingModule} from '@nestjs/testing';
import {PostCreateTransferHandler} from './post-create-transfer.handler';
import {PostCreateTransferUseCase} from '../../domain/src/usecase/post-create-transfer.usecase';
import {PostCreateTransferMapper} from '../model/mapper/post-create-transfer.mapper';
import {HTTPResponse} from '../model/dto/http-response.model';
import {SUCCESS_STATES_MESSAGES} from '../common/response-states/success-states.messages';
import {HttpStatus} from '@nestjs/common';
import {CreateTransferDto} from '../adapter/in/http/dto/create-transfer.dto';
import {MetricsService} from '../common/metrics/metrics.service';
import {VendorResponse} from '../../domain/src/interface/vendors.interface';

describe('PostCreateTransferHandler', () => {
  let handler: PostCreateTransferHandler;
  let useCase: PostCreateTransferUseCase;
  let metricsService: MetricsService;

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
        {
          provide: MetricsService,
          useValue: {
            incrementTransfersTotal: jest.fn(),
            recordTransferAmount: jest.fn(),
            recordTransferLatency: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<PostCreateTransferHandler>(PostCreateTransferHandler);
    useCase = module.get<PostCreateTransferUseCase>(
      'PostCreateTransferUseCase'
    );
    metricsService = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return a successful HTTP response and record metrics', async () => {
    const request: CreateTransferDto = {
      amount: 100,
      txhash: '0x123',
      vendor: 'BlockchainVendorA',
    };
    const useCaseResponse: VendorResponse = {
      provider: 'BlockchainVendorA',
      status: 'CONFIRMED',
      transactionId: '0xabc',
      rawData: {},
    };

    jest.spyOn(PostCreateTransferMapper, 'toModel').mockReturnValue(request);
    jest.spyOn(useCase, 'apply').mockResolvedValue(useCaseResponse);
    jest
      .spyOn(PostCreateTransferMapper, 'toDTO')
      .mockReturnValue(useCaseResponse as unknown as CreateTransferDto);

    const result = await handler.execute(request);

    expect(result).toEqual(
      new HTTPResponse(
        HttpStatus.CREATED,
        SUCCESS_STATES_MESSAGES.Success.code,
        'Transfer created successfully',
        useCaseResponse
      )
    );
    expect(metricsService.incrementTransfersTotal).toHaveBeenCalledWith(
      'BlockchainVendorA',
      'success'
    );
    expect(metricsService.recordTransferAmount).toHaveBeenCalledWith(
      100,
      'BlockchainVendorA'
    );
    expect(metricsService.recordTransferLatency).toHaveBeenCalled();
  });

  it('should record failure metrics when the use case fails', async () => {
    const request: CreateTransferDto = {
      amount: 100,
      txhash: '0x123',
      vendor: 'BlockchainVendorA',
    };

    jest.spyOn(PostCreateTransferMapper, 'toModel').mockReturnValue(request);
    jest.spyOn(useCase, 'apply').mockRejectedValue(new Error('Test Error'));

    await expect(handler.execute(request)).rejects.toThrow('Test Error');

    expect(metricsService.incrementTransfersTotal).toHaveBeenCalledWith(
      'unknown',
      'failure'
    );
    expect(metricsService.recordTransferAmount).toHaveBeenCalledWith(
      100,
      'unknown'
    );
    expect(metricsService.recordTransferLatency).toHaveBeenCalled();
  });
});
