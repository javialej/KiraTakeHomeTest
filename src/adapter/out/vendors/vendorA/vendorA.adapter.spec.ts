import {Test, TestingModule} from '@nestjs/testing';
import {VendorAAdapter, VendorARequestDto} from './vendorA.adapter';
import {CustomException} from '../../../../model/exceptions/custom.model';
import {of, throwError} from 'rxjs';

describe('VendorAAdapter', () => {
  let adapter: VendorAAdapter;

  const httpServiceMock = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorAAdapter,
        {
          provide: 'httpService',
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    adapter = module.get<VendorAAdapter>(VendorAAdapter);
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  it('should throw a CustomException if the API call fails', async () => {
    const request: VendorARequestDto = {
      transactionId: '123',
      amount: 100,
      currency: 'USD',
    };
    httpServiceMock.post.mockReturnValueOnce(
      throwError(() => new Error('API Error'))
    );

    await expect(adapter.callApi(request)).rejects.toBeInstanceOf(
      CustomException
    );
  });

  it('should return data on successful API call', async () => {
    const request: VendorARequestDto = {
      transactionId: '123',
      amount: 100,
      currency: 'USD',
    };
    const response = {data: {status: 'success', confirmationId: 'abc'}};
    httpServiceMock.post.mockReturnValueOnce(of(response));

    const result = await adapter.callApi(request);

    expect(result).toEqual(response.data);
    expect(httpServiceMock.post).toHaveBeenCalledWith(
      'https://api.vendora.com/transfer',
      request,
      {headers: {'X-Api-Key': 'your-vendor-a-api-key'}}
    );
  });
});
