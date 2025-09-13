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

// DTOs specific to Vendor B
class VendorBRequestDto {
  readonly sourceTxHash!: string;
  readonly destinationAddress!: string;
  readonly amount!: number;
  readonly asset!: string;
  readonly network!: string;
}

class VendorBResponseDto {
  readonly offRampTransactionId!: string;
  readonly status!: string;
}

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
