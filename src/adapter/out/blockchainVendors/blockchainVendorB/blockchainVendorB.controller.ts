import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {
  IVendors,
  VendorRequest,
  VendorResponse,
} from '../../../../../domain/src/interface/vendors.interface';

@Injectable()
export class BlockchainVendorBController implements IVendors {
  constructor(
    @Inject('httpService') private readonly httpService: HttpService
  ) {}

  public async requestToVendors(
    request: VendorRequest
  ): Promise<VendorResponse> {
    // Mocked response for Vendor B
    const mockResponse = {
      status: 'PENDING',
      offRampTransactionId: `0xxyz-vendor-b-${request.txhash.slice(0, 5)}`,
    };

    return Promise.resolve({
      status: mockResponse.status,
      transactionId: mockResponse.offRampTransactionId,
      provider: 'BlockchainVendorB',
      rawData: mockResponse,
    });
  }
}
