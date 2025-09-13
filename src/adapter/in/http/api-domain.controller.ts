import {Controller, Get, Param, UseGuards, Post, Body} from '@nestjs/common';
import {ApiBearerAuth, ApiParam, ApiTags} from '@nestjs/swagger';
import {HTTPResponse} from '../../../model/dto/http-response.model';
import {CognitoAuthGuard} from '../../../common/guards/cognito-auth.guard';
import {HandlerGetFeature} from '../../../handler/get-feature.handler';
import {GetFeatureRequest} from '../../../model/dto/feature.type';
import {GetFeaturePipe} from './get-feature.pipe';
import {SUCCESS_STATES_MESSAGES} from '../../../common/response-states/success-states.messages';
import {CreateTransferDto} from './dto/create-transfer.dto';

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
  // eslint-disable-next-line @typescript-eslint/require-await
  async createTransfer(
    @Body() createTransferDto: CreateTransferDto
  ): Promise<HTTPResponse> {
    // In a real implementation, this would call a handler to process the transfer.
    // eslint-disable-next-line no-console
    console.log('Received transfer request:', createTransferDto);
    return new HTTPResponse(
      201,
      SUCCESS_STATES_MESSAGES.Success.code,
      'Transfer request received.',
      createTransferDto
    );
  }
}
