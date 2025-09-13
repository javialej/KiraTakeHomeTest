import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {
  IVendors,
  VendorRequest,
  VendorResponse,
} from '../../../../../domain/src/interface/vendors.interface';

@Injectable()
export class BlockchainVendorAController implements IVendors {
  constructor(
    @Inject('httpService') private readonly httpService: HttpService
  ) {}

  public async requestToVendors(
    request: VendorRequest
  ): Promise<VendorResponse> {
    // Mocked response for Vendor A
    const mockResponse = {
      transactionStatus: 'CONFIRMED',
      destinationTransactionHash: `0xabc-vendor-a-${request.txhash.slice(
        0,
        5
      )}`,
    };

    return Promise.resolve({
      status: mockResponse.transactionStatus,
      transactionId: mockResponse.destinationTransactionHash,
      provider: 'BlockchainVendorA',
      rawData: mockResponse,
    });
  }
}
