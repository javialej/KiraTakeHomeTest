import {PostCreateTransferUseCase} from './post-create-transfer.usecase';
import {
  IVendors,
  VendorRequest,
  VendorResponse,
} from '../interface/vendors.interface';
import {ILogger} from '../interface/logger.interface';

describe('PostCreateTransferUseCase', () => {
  let useCase: PostCreateTransferUseCase;
  let vendors: IVendors;
  let logger: ILogger;

  beforeEach(() => {
    vendors = {
      requestToVendors: jest.fn(),
    };
    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };
    useCase = new PostCreateTransferUseCase(vendors, logger);
  });

  it('should call the vendor and return the response', async () => {
    const request: VendorRequest = {
      amount: 100,
      txhash: '0x123',
      vendor: 'BlockchainVendorA',
    };
    const expectedResponse: VendorResponse = {
      status: 'CONFIRMED',
      transactionId: '0xabc',
      provider: 'BlockchainVendorA',
      rawData: {},
    };

    (vendors.requestToVendors as jest.Mock).mockResolvedValue(expectedResponse);

    const result = await useCase.apply(request);

    expect(vendors.requestToVendors).toHaveBeenCalledWith(request);
    expect(result).toEqual(expectedResponse);
    expect(logger.log).toHaveBeenCalledWith(
      'PostCreateTransferUseCase initialized'
    );
  });
});
