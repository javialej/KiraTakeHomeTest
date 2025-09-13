
import { Test, TestingModule } from '@nestjs/testing';
import { VendorAController, VendorARequestDto } from './vendorA.controller';
import { CustomException } from '../../../../model/exceptions/custom.model';
import { of, throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';

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
    const request: VendorARequestDto = { transactionId: '123', amount: 100, currency: 'USD' };
    httpServiceMock.post.mockReturnValueOnce(throwError(() => new Error('API Error')));

    await expect(controller.callApi(request)).rejects.toBeInstanceOf(CustomException);
  });

  it('should return data on successful API call', async () => {
    const request: VendorARequestDto = { transactionId: '123', amount: 100, currency: 'USD' };
    const response = { data: { status: 'success', confirmationId: 'abc' } };
    httpServiceMock.post.mockReturnValueOnce(of(response));

    const result = await controller.callApi(request);

    expect(result).toEqual(response.data);
    expect(httpServiceMock.post).toHaveBeenCalledWith(
      'https://api.vendora.com/transfer',
      request,
      { headers: { 'X-Api-Key': 'your-vendor-a-api-key' } },
    );
  });
});
