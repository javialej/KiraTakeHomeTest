import {Controller, Post, Body} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {HTTPResponse} from '../../../model/dto/http-response.model';
import {CreateTransferDto} from './dto/create-transfer.dto';
import {PostCreateTransferHandler} from '../../../handler/post-create-transfer.handler';
import {PostCreateTransferPipe} from './post-create-transfer.pipe';

@ApiTags('Api Payments')
@Controller('api-payments')
export class ApiPaymentsController {
  constructor(
    private readonly postCreateTransferHandler: PostCreateTransferHandler,
  ) {}

  @Post('transfer')
  async postCreateTransfer(
    @Body(new PostCreateTransferPipe()) createTransferDto: CreateTransferDto,
  ): Promise<HTTPResponse> {
    return this.postCreateTransferHandler.execute(createTransferDto);
  }
}
