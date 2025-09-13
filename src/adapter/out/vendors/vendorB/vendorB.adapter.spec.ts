import {Test, TestingModule} from '@nestjs/testing';
import {VendorBAdapter, VendorBRequestDto} from './vendorB.adapter';
import {CustomException} from '../../../../model/exceptions/custom.model';
import {of, throwError} from 'rxjs';

describe('VendorBAdapter', () => {
  let adapter: VendorBAdapter;

  const httpServiceMock = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorBAdapter,
        {
          provide: 'httpService',
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    adapter = module.get<VendorBAdapter>(VendorBAdapter);
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  it('should throw a CustomException if the API call fails', async () => {
    const request: VendorBRequestDto = {
      paymentId: '456',
      destination: {name: 'test', account: '123'},
      details: {amount: 200, currency: 'COP'},
    };
    httpServiceMock.post.mockReturnValueOnce(
      throwError(() => new Error('API Error'))
    );

    await expect(adapter.executeTransfer(request)).rejects.toBeInstanceOf(
      CustomException
    );
  });

  it('should return data on successful API call', async () => {
    const request: VendorBRequestDto = {
      paymentId: '456',
      destination: {name: 'test', account: '123'},
      details: {amount: 200, currency: 'COP'},
    };
    const response = {data: {id: 'xyz', executionStatus: 'completed'}};
    httpServiceMock.post.mockReturnValueOnce(of(response));

    const result = await adapter.executeTransfer(request);

    expect(result).toEqual(response.data);
    expect(httpServiceMock.post).toHaveBeenCalledWith(
      'https://api.vendorb.io/v2/payments',
      request,
      {headers: {Authorization: 'Bearer your-vendor-b-secret-token'}}
    );
  });
});
