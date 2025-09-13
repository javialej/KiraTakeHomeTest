
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AcmeRequestDto, AcmeResponseDto } from './dto/acme.dto';

@Injectable()
export class AcmeAdapter {
  constructor(private readonly httpService: HttpService) {}

  async callApi(request: AcmeRequestDto): Promise<AcmeResponseDto> {
    const url = 'https://api.acme.com/endpoint'; // Replace with the actual API endpoint
    const headers = {
      'Authorization': `Bearer your-api-key`, // Replace with your actual API key
    };

    const response = await firstValueFrom(
      this.httpService.post(url, request, { headers }),
    );

    return response.data;
  }
}
