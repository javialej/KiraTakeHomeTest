
import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainVendorAController } from './blockchainVendorA.controller';
import { CustomException } from '../../../../model/exceptions/custom.model';
import { of, throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { VendorRequest, VendorResponse } from '../../../../../domain/src/interface/vendors.interface';
import { AxiosError } from 'axios';

describe('BlockchainVendorAController', () => {
  let controller: BlockchainVendorAController;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockchainVendorAController,
        {
          provide: 'httpService',
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BlockchainVendorAController>(BlockchainVendorAController);
    httpService = module.get<HttpService>('httpService');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw a CustomException if the API call fails', async () => {
    const request: VendorRequest = { amount: 100, txhash: '0x123' };
    jest.spyOn(httpService, 'post').mockReturnValueOnce(throwError(() => new AxiosError('API Error')));

    await expect(controller.requestToVendors(request)).rejects.toBeInstanceOf(CustomException);
  });

  it('should return a mapped VendorResponse on successful API call', async () => {
    const request: VendorRequest = { amount: 100, txhash: '0x123' };
    const vendorApiResponse = {
      data: { transactionStatus: 'CONFIRMED', destinationTransactionHash: '0xabc' },
    };
    jest.spyOn(httpService, 'post').mockReturnValueOnce(of(vendorApiResponse));

    const result: VendorResponse = await controller.requestToVendors(request);

    expect(result).toEqual({
      status: 'CONFIRMED',
      transactionId: '0xabc',
      provider: 'BlockchainVendorA',
      rawData: vendorApiResponse.data,
    });

    expect(httpService.post).toHaveBeenCalledWith(
      'https://api.vendora.com/v1/blockchain/transfer',
      {
        sourceTransactionHash: '0x123',
        amount: 100,
        targetAsset: 'COP',
        network: 'POLYGON',
      },
      { headers: { 'X-Api-Key': 'your-vendor-a-api-key' } },
    );
  });
});
