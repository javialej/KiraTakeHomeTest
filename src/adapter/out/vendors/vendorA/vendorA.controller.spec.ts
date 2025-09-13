
import { Test, TestingModule } from '@nestjs/testing';
import { VendorAController } from './vendorA.controller';
import { CustomException } from '../../../../model/exceptions/custom.model';
import { of, throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { VendorRequest, VendorResponse } from '../../../../../domain/src/interface/vendors.interface';

describe('VendorAController', () => {
  let controller: VendorAController;

  const httpServiceMock = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorAController,
        {
          provide: 'httpService',
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    controller = module.get<VendorAController>(VendorAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw a CustomException if the API call fails', async () => {
    const request: VendorRequest = { amount: 100, vendor: 'VendorA', txhash: '0x123' };
    httpServiceMock.post.mockReturnValueOnce(throwError(() => new Error('API Error')));

    await expect(controller.requestToVendor(request)).rejects.toBeInstanceOf(CustomException);
  });

  it('should return a mapped VendorResponse on successful API call', async () => {
    const request: VendorRequest = { amount: 100, vendor: 'VendorA', txhash: '0x123' };
    const vendorApiResponse = { data: { status: 'completed', confirmationId: 'abc-xyz-123' } };
    httpServiceMock.post.mockReturnValueOnce(of(vendorApiResponse));

    const result: VendorResponse = await controller.requestToVendor(request);

    // Verify the mapping to the domain response
    expect(result).toEqual({
      status: 'completed',
      transactionId: 'abc-xyz-123',
      provider: 'VendorA',
      rawData: vendorApiResponse.data,
    });

    // Verify the mapping from the domain request to the vendor-specific request
    expect(httpServiceMock.post).toHaveBeenCalledWith(
      'https://api.vendora.com/transfer',
      {
        transactionId: '0x123',
        amount: 100,
        currency: 'USD',
      },
      { headers: { 'X-Api-Key': 'your-vendor-a-api-key' } },
    );
  });
});
