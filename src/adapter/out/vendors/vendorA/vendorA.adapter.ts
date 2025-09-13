
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { VendorARequestDto, VendorAResponseDto } from './dto/vendorA.dto';

@Injectable()
export class VendorAAdapter {
  constructor(private readonly httpService: HttpService) {}

  async callApi(request: VendorARequestDto): Promise<VendorAResponseDto> {
    const url = 'https://api.vendora.com/transfer'; // Example endpoint
    const headers = {
      'X-Api-Key': `your-vendor-a-api-key`, // Example header
    };

    const response = await firstValueFrom(
      this.httpService.post(url, request, { headers }),
    );

    return response.data;
  }
}
