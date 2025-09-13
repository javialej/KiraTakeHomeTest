
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CustomException } from '../../../../model/exceptions/custom.model';
import { ERROR_STATES_MESSAGES } from '../../../../common/response-states/error-states.messages';
import { IVendors, VendorRequest, VendorResponse } from '../../../../../domain/src/interface/vendors.interface';

// DTOs specific to Vendor A
class VendorARequestDto {
  readonly transactionId!: string;
  readonly amount!: number;
  readonly currency!: string;
}

class VendorAResponseDto {
  readonly status!: string;
  readonly confirmationId!: string;
}

@Injectable()
export class VendorAController implements IVendors {
  constructor(
    @Inject('httpService') private readonly httpService: HttpService,
  ) {}

  public async requestToVendors(request: VendorRequest): Promise<VendorResponse> {
    const url = 'https://api.vendora.com/transfer'; // Example endpoint
    const headers = {
      'X-Api-Key': `your-vendor-a-api-key`, // Example header
    };

    // Map domain request to vendor-specific DTO
    const vendorRequest: VendorARequestDto = {
      transactionId: request.txhash,
      amount: request.amount,
      currency: 'USD', // Assuming a default or logic to determine currency
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post<VendorAResponseDto>(url, vendorRequest, { headers }).pipe(
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
        transactionId: response.data.confirmationId,
        provider: 'VendorA',
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
