import {Controller, Get, Param, Post, Body} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {HTTPResponse} from '../../../model/dto/http-response.model';
import {HandlerGetFeature} from '../../../handler/get-feature.handler';
import {GetFeatureRequest} from '../../../model/dto/feature.type';
import {GetFeaturePipe} from './get-feature.pipe';
import {CreateTransferDto} from './dto/create-transfer.dto';
import {PostCreateTransferHandler} from '../../../handler/post-create-transfer.handler';
import {PostCreateTransferPipe} from './post-create-transfer.pipe';

@ApiTags('Api Payments')
@Controller('api-payments')
export class ApiPaymentsController {
  constructor(
    private readonly handlerGetFeature: HandlerGetFeature,
    private readonly postCreateTransferHandler: PostCreateTransferHandler,
  ) {}

  @Get('user/:email')
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email User',
    type: String,
  })
  async getFeature(
    @Param(new GetFeaturePipe()) email: GetFeatureRequest,
  ): Promise<HTTPResponse> {
    return this.handlerGetFeature.execute(email);
  }

  @Post('transfer')
  async postCreateTransfer(
    @Body(new PostCreateTransferPipe()) createTransferDto: CreateTransferDto,
  ): Promise<HTTPResponse> {
    return this.postCreateTransferHandler.execute(createTransferDto);
  }
}
