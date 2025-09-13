import {Injectable, Inject, HttpStatus} from '@nestjs/common';
import {Span} from '@opentelemetry/api';
import {HTTPResponse} from '../model/dto/http-response.model';
import {SUCCESS_STATES_MESSAGES} from '../common/response-states/success-states.messages';
import {getTracer} from '../common/utils/general.util';
import {CreateTransferDto} from '../adapter/in/http/dto/create-transfer.dto';
import {PostCreateTransferUseCase} from '../../domain/src/usecase/post-create-transfer.usecase';
import {PostCreateTransferMapper} from '../model/mapper/post-create-transfer.mapper';

@Injectable()
export class PostCreateTransferHandler {
  constructor(
    @Inject('PostCreateTransferUseCase')
    private readonly postCreateTransferUC: PostCreateTransferUseCase,
  ) {}

  async execute(request: CreateTransferDto): Promise<HTTPResponse> {
    return getTracer().startActiveSpan(
      'PostCreateTransferUseCase.apply',
      {attributes: {'transfer.vendor': request.vendor}},
      async (span: Span): Promise<HTTPResponse> => {
        try {
          const command = PostCreateTransferMapper.toModel(request);
          const transfer = await this.postCreateTransferUC.apply(command);
          const response = PostCreateTransferMapper.toDTO(transfer);
          return new HTTPResponse(
            HttpStatus.CREATED,
            SUCCESS_STATES_MESSAGES.Success.code,
            'Transfer created successfully',
            response,
          );
        } finally {
          span.end();
        }
      },
    );
  }
}
