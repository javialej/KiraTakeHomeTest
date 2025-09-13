
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CustomException } from '../../../../model/exceptions/custom.model';
import { ERROR_STATES_MESSAGES } from '../../../../common/response-states/error-states.messages';
import { IVendors, VendorRequest, VendorResponse } from '../../../../../domain/src/interface/vendors.interface';

// DTOs specific to Vendor B
class VendorBRequestDto {
  readonly paymentId!: string;
  readonly destination!: {
    readonly name: string;
    readonly account: string;
  };
  readonly details!: {
    readonly amount: number;
    readonly currency: string;
  };
}

class VendorBResponseDto {
  readonly id!: string;
  readonly executionStatus!: string;
}

@Injectable()
export class VendorBController implements IVendors {
  constructor(
    @Inject('httpService') private readonly httpService: HttpService,
  ) {}

  public async requestToVendors(request: VendorRequest): Promise<VendorResponse> {
    const url = 'https://api.vendorb.io/v2/payments'; // Example endpoint
    const headers = {
      'Authorization': `Bearer your-vendor-b-secret-token`, // Example header
    };

    // Map domain request to vendor-specific DTO
    const vendorRequest: VendorBRequestDto = {
      paymentId: request.txhash,
      destination: {
        name: 'User Name', // Example mapping
        account: '1234567890', // Example mapping
      },
      details: {
        amount: request.amount,
        currency: 'COP', // Assuming a default or logic to determine currency
      },
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
        status: response.data.executionStatus,
        transactionId: response.data.id,
        provider: 'VendorB',
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
