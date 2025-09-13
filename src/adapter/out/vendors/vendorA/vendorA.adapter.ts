
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CustomException } from '../../../../model/exceptions/custom.model';
import { ERROR_STATES_MESSAGES } from '../../../../common/response-states/error-states.messages';

export class VendorARequestDto {
  // Properties specific to VendorA's API request
  readonly transactionId: string;
  readonly amount: number;
  readonly currency: string;
}

export class VendorAResponseDto {
  // Properties specific to VendorA's API response
  readonly status: string;
  readonly confirmationId: string;
}

@Injectable()
class VendorAAdapter {
  constructor(
    @Inject('httpService') private readonly httpService: HttpService,
  ) {}

  public async callApi(request: VendorARequestDto): Promise<VendorAResponseDto> {
    const url = 'https://api.vendora.com/transfer'; // Example endpoint
    const headers = {
      'X-Api-Key': `your-vendor-a-api-key`, // Example header
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

export { VendorAAdapter };
