
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { VendorBRequestDto, VendorBResponseDto } from './dto/vendorB.dto';

@Injectable()
export class VendorBAdapter {
  constructor(private readonly httpService: HttpService) {}

  async executeTransfer(request: VendorBRequestDto): Promise<VendorBResponseDto> {
    const url = 'https://api.vendorb.io/v2/payments'; // Example endpoint
    const headers = {
      'Authorization': `Bearer your-vendor-b-secret-token`, // Example header
    };

    const response = await firstValueFrom(
      this.httpService.post(url, request, { headers }),
    );

    return response.data;
  }
}
