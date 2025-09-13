
import { Test, TestingModule } from '@nestjs/testing';
import { VendorBController } from './vendorB.controller';
import { CustomException } from '../../../../model/exceptions/custom.model';
import { of, throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { VendorRequest, VendorResponse } from '../../../../../domain/src/interface/vendors.interface';

describe('VendorBController', () => {
  let controller: VendorBController;

  const httpServiceMock = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorBController,
        {
          provide: 'httpService',
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    controller = module.get<VendorBController>(VendorBController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw a CustomException if the API call fails', async () => {
    const request: VendorRequest = { amount: 200, vendor: 'VendorB', txhash: '0x456' };
    httpServiceMock.post.mockReturnValueOnce(throwError(() => new Error('API Error')));

    await expect(controller.requestToVendors(request)).rejects.toBeInstanceOf(CustomException);
  });

  it('should return a mapped VendorResponse on successful API call', async () => {
    const request: VendorRequest = { amount: 200, vendor: 'VendorB', txhash: '0x456' };
    const vendorApiResponse = { data: { id: 'xyz-789', executionStatus: 'success' } };
    httpServiceMock.post.mockReturnValueOnce(of(vendorApiResponse));

    const result: VendorResponse = await controller.requestToVendors(request);

    // Verify the mapping to the domain response
    expect(result).toEqual({
      status: 'success',
      transactionId: 'xyz-789',
      provider: 'VendorB',
      rawData: vendorApiResponse.data,
    });

    // Verify the mapping from the domain request to the vendor-specific request
    expect(httpServiceMock.post).toHaveBeenCalledWith(
      'https://api.vendorb.io/v2/payments',
      {
        paymentId: '0x456',
        destination: {
          name: 'User Name',
          account: '1234567890',
        },
        details: {
          amount: 200,
          currency: 'COP',
        },
      },
      { headers: { 'Authorization': 'Bearer your-vendor-b-secret-token' } },
    );
  });
});
