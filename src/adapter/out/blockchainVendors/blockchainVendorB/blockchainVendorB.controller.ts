
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CustomException } from '../../../../model/exceptions/custom.model';
import { ERROR_STATES_MESSAGES } from '../../../../common/response-states/error-states.messages';
import { IVendors, VendorRequest, VendorResponse } from '../../../../../domain/src/interface/vendors.interface';

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
    @Inject('httpService') private readonly httpService: HttpService,
  ) {}

  public async requestToVendors(request: VendorRequest): Promise<VendorResponse> {
    const url = 'https://api.vendorb.io/v3/offramp/initiate'; // Example endpoint
    const headers = {
      'Authorization': `Bearer your-vendor-b-secret-token`, // Example header
    };

    // Map domain request to vendor-specific DTO
    const vendorRequest: VendorBRequestDto = {
      sourceTxHash: request.txhash,
      destinationAddress: '0x...user-bank-account-surrogate', // Example mapping
      amount: request.amount,
      asset: 'USDC',
      network: 'ETHEREUM', // Example mapping
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post<VendorBResponseDto>(url, vendorRequest, { headers }).pipe(
          catchError((error: AxiosError) => {
            throw new CustomException(
              error as Error,
              'Technical',
              ERROR_STATES_MESSAGES.BusinessException,
            );
          }),
        ),
      );

      // Map vendor-specific response back to domain response
      return {
        status: response.data.status,
        transactionId: response.data.offRampTransactionId,
        provider: 'BlockchainVendorB',
        rawData: response.data,
      };
    } catch (error) {
      throw new CustomException(
        error as Error,
        'Technical',
        ERROR_STATES_MESSAGES.BusinessException,
      );
    }
  }
}
