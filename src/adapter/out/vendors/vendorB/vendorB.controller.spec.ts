
import { Test, TestingModule } from '@nestjs/testing';
import { VendorBController, VendorBRequestDto } from './vendorB.controller';
import { CustomException } from '../../../../model/exceptions/custom.model';
import { of, throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';

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
    const request: VendorBRequestDto = { paymentId: '456', destination: { name: 'test', account: '123' }, details: { amount: 200, currency: 'COP' } };
    httpServiceMock.post.mockReturnValueOnce(throwError(() => new Error('API Error')));

    await expect(controller.executeTransfer(request)).rejects.toBeInstanceOf(CustomException);
  });

  it('should return data on successful API call', async () => {
    const request: VendorBRequestDto = { paymentId: '456', destination: { name: 'test', account: '123' }, details: { amount: 200, currency: 'COP' } };
    const response = { data: { id: 'xyz', executionStatus: 'completed' } };
    httpServiceMock.post.mockReturnValueOnce(of(response));

    const result = await controller.executeTransfer(request);

    expect(result).toEqual(response.data);
    expect(httpServiceMock.post).toHaveBeenCalledWith(
      'https://api.vendorb.io/v2/payments',
      request,
      { headers: { 'Authorization': 'Bearer your-vendor-b-secret-token' } },
    );
  });
});
