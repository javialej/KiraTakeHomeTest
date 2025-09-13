
import {Controller, Get, Param, UseGuards, Post, Body} from '@nestjs/common';
import {ApiBearerAuth, ApiParam, ApiTags} from '@nestjs/swagger';
import {HTTPResponse} from '../../../model/dto/http-response.model';
import {CognitoAuthGuard} from '../../../common/guards/cognito-auth.guard';
import {HandlerGetFeature} from '../../../handler/get-feature.handler';
import {GetFeatureRequest} from '../../../model/dto/feature.type';
import {GetFeaturePipe} from './get-feature.pipe';
import { CreateTransferDto } from './dto/create-transfer.dto';

@ApiTags('Api Domain')
@Controller('api-domain')
export class ApiDomainController {
  constructor(private readonly handlerGetFeature: HandlerGetFeature) {}

  @UseGuards(CognitoAuthGuard)
  @Get('user/:email')
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email User',
    type: String,
  })
  @ApiBearerAuth('Cognito-Auth')
  async getFeature(
    @Param(new GetFeaturePipe()) email: GetFeatureRequest
  ): Promise<HTTPResponse> {
    return this.handlerGetFeature.execute(email);
  }

  @Post('transfer')
  @UseGuards(CognitoAuthGuard)
  @ApiBearerAuth('Cognito-Auth')
  async createTransfer(@Body() createTransferDto: CreateTransferDto): Promise<HTTPResponse> {
    // In a real implementation, this would call a handler to process the transfer.
    console.log('Received transfer request:', createTransferDto);
    return {
        statusCode: 201,
        message: 'Transfer request received.',
        data: createTransferDto,
    };
  }
}
