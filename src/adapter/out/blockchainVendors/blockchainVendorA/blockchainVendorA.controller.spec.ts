import {Test, TestingModule} from '@nestjs/testing';
import {BlockchainVendorAController} from './blockchainVendorA.controller';
import {
  VendorRequest,
  VendorResponse,
} from '../../../../../domain/src/interface/vendors.interface';

describe('BlockchainVendorAController', () => {
  let controller: BlockchainVendorAController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockchainVendorAController],
      providers: [
        {
          provide: 'httpService',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BlockchainVendorAController>(
      BlockchainVendorAController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a mocked CONFIRMED response', async () => {
    const request: VendorRequest = {
      amount: 100,
      txhash: '0x123',
    };

    const result: VendorResponse = await controller.requestToVendors(request);

    expect(result.status).toEqual('CONFIRMED');
    expect(result.provider).toEqual('BlockchainVendorA');
    expect(result.transactionId).toContain('0xabc-vendor-a-');
    expect(result.rawData.transactionStatus).toEqual('CONFIRMED');
  });
});
