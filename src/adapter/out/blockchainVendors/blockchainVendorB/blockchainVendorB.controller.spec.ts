import {Test, TestingModule} from '@nestjs/testing';
import {BlockchainVendorBController} from './blockchainVendorB.controller';
import {CustomException} from '../../../../model/exceptions/custom.model';
import {of, throwError} from 'rxjs';
import {HttpService} from '@nestjs/axios';
import {
  VendorRequest,
  VendorResponse,
} from '../../../../../domain/src/interface/vendors.interface';
import {AxiosError} from 'axios';

describe('BlockchainVendorBController', () => {
  let controller: BlockchainVendorBController;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockchainVendorBController,
        {
          provide: 'httpService',
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BlockchainVendorBController>(
      BlockchainVendorBController
    );
    httpService = module.get<HttpService>('httpService');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw a CustomException if the API call fails', async () => {
    const request: VendorRequest = {amount: 200, txhash: '0x456'};
    jest
      .spyOn(httpService, 'post')
      .mockReturnValueOnce(throwError(() => new AxiosError('API Error')));

    await expect(controller.requestToVendors(request)).rejects.toBeInstanceOf(
      CustomException
    );
  });

  it('should return a mapped VendorResponse on successful API call', async () => {
    const request: VendorRequest = {amount: 200, txhash: '0x456'};
    const vendorApiResponse = {
      data: {status: 'FINALIZED', offRampTransactionId: '0xdef'},
    };
    jest.spyOn(httpService, 'post').mockReturnValueOnce(of(vendorApiResponse));

    const result: VendorResponse = await controller.requestToVendors(request);

    expect(result).toEqual({
      status: 'FINALIZED',
      transactionId: '0xdef',
      provider: 'BlockchainVendorB',
      rawData: vendorApiResponse.data,
    });

    expect(httpService.post).toHaveBeenCalledWith(
      'https://api.vendorb.io/v3/offramp/initiate',
      {
        sourceTxHash: '0x456',
        destinationAddress: '0x...user-bank-account-surrogate',
        amount: 200,
        asset: 'USDC',
        network: 'ETHEREUM',
      },
      {headers: {Authorization: 'Bearer your-vendor-b-secret-token'}}
    );
  });
});
