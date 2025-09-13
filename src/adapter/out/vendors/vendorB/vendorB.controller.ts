
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CustomException } from '../../../../model/exceptions/custom.model';
import { ERROR_STATES_MESSAGES } from '../../../../common/response-states/error-states.messages';

export class VendorBRequestDto {
  // Properties specific to VendorB's API request
  readonly paymentId: string;
  readonly destination: {
    readonly name: string;
    readonly account: string;
  };
  readonly details: {
    readonly amount: number;
    readonly currency: string;
  };
}

export class VendorBResponseDto {
  // Properties specific to VendorB's API response
  readonly id: string;
  readonly executionStatus: string;
}

@Injectable()
export class VendorBController {
  constructor(
    @Inject('httpService') private readonly httpService: HttpService,
  ) {}

  public async executeTransfer(request: VendorBRequestDto): Promise<VendorBResponseDto> {
    const url = 'https://api.vendorb.io/v2/payments'; // Example endpoint
    const headers = {
      'Authorization': `Bearer your-vendor-b-secret-token`, // Example header
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, request, { headers }).pipe(
          catchError((error: AxiosError) => {
            throw new CustomException(
              error as Error,
              'Technical',
              ERROR_STATES_MESSAGES.BusinessException,
            );
          }),
        ),
      );
      return response.data;
    } catch (error) {
      throw new CustomException(
        error as Error,
        'Technical',
        ERROR_STATES_MESSAGES.BusinessException,
      );
    }
  }
}
