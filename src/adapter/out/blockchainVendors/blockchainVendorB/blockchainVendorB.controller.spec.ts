import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainVendorBController } from './blockchainVendorB.controller';
import { VendorRequest, VendorResponse } from '../../../../../domain/src/interface/vendors.interface';
import { HttpService } from '@nestjs/axios';

describe('BlockchainVendorBController', () => {
  let controller: BlockchainVendorBController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockchainVendorBController],
      providers: [
        {
          provide: 'httpService',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BlockchainVendorBController>(BlockchainVendorBController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a mocked PENDING response', async () => {
    const request: VendorRequest = {
      amount: 200,
      txhash: '0x456',
    };

    const result: VendorResponse = await controller.requestToVendors(request);

    expect(result.status).toEqual('PENDING');
    expect(result.provider).toEqual('BlockchainVendorB');
    expect(result.transactionId).toContain('0xxyz-vendor-b-');
    expect(result.rawData.status).toEqual('PENDING');
  });
});
