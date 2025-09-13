import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {catchError, firstValueFrom} from 'rxjs';
import {AxiosError} from 'axios';
import {CustomException} from '../../../../model/exceptions/custom.model';
import {ERROR_STATES_MESSAGES} from '../../../../common/response-states/error-states.messages';
import {
  IVendors,
  VendorRequest,
  VendorResponse,
} from '../../../../../domain/src/interface/vendors.interface';

// DTOs specific to Vendor A
class VendorARequestDto {
  readonly sourceTransactionHash!: string;
  readonly amount!: number;
  readonly targetAsset!: string;
  readonly network!: string;
}

class VendorAResponseDto {
  readonly transactionStatus!: string;
  readonly destinationTransactionHash!: string;
}

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
      destinationTransactionHash: `0xabc-vendor-a-${request.txhash.slice(0, 5)}`,
    };

    return Promise.resolve({
      status: mockResponse.transactionStatus,
      transactionId: mockResponse.destinationTransactionHash,
      provider: 'BlockchainVendorA',
      rawData: mockResponse,
    });
  }
}
