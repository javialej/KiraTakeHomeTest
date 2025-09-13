
import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {catchError, firstValueFrom} from 'rxjs';
import {AxiosError} from 'axios';
import {CustomException} from '../../../../model/exceptions/custom.model';
import {ERROR_STATES_MESSAGES} from '../../../../common/response-states/error-states.messages';
import {VendorARequestDto, VendorAResponseDto} from './dto/vendorA.dto';

@Injectable()
class VendorAController {
  constructor(
    @Inject('httpService') private readonly httpService: HttpService,
  ) {}

  async processTransaction(
    request: VendorARequestDto,
  ): Promise<VendorAResponseDto> {
    const {data} = await firstValueFrom(
      this.httpService.post<VendorAResponseDto>('url_vendor_a', request).pipe(
        catchError((error: AxiosError) => {
          throw new CustomException(
            ERROR_STATES_MESSAGES.InternalServerError,
            `An error occurred while processing the transaction with Vendor A: ${error.message}`,
            500,
          );
        }),
      ),
    );
    return data;
  }
}

export {VendorAController};
