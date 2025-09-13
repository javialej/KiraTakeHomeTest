
import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {catchError, firstValueFrom} from 'rxjs';
import {AxiosError} from 'axios';
import {CustomException} from '../../../../model/exceptions/custom.model';
import {ERROR_STATES_MESSAGES} from '../../../../common/response-states/error-states.messages';
import {VendorBRequestDto, VendorBResponseDto} from './dto/vendorB.dto';

@Injectable()
class VendorBController {
  constructor(
    @Inject('httpService') private readonly httpService: HttpService,
  ) {}

  async processTransaction(
    request: VendorBRequestDto,
  ): Promise<VendorBResponseDto> {
    const {data} = await firstValueFrom(
      this.httpService.post<VendorBResponseDto>('url_vendor_b', request).pipe(
        catchError((error: AxiosError) => {
          throw new CustomException(
            ERROR_STATES_MESSAGES.InternalServerError,
            `An error occurred while processing the transaction with Vendor B: ${error.message}`,
            500,
          );
        }),
      ),
    );
    return data;
  }
}

export {VendorBController};
