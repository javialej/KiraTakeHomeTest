import {Test, TestingModule} from '@nestjs/testing';
import {ApiPaymentsController} from './api-payments.controller';
import {HandlerGetFeature} from 'src/handler/get-feature.handler';
import {HTTPResponse} from 'src/model/dto/http-response.model';
import {GetFeatureRequest} from 'src/model/dto/feature.type';

describe('ApiPaymentsController', () => {
  let controller: ApiPaymentsController;
  let handlerGetFeature: HandlerGetFeature;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiPaymentsController],
      providers: [
        {
          provide: HandlerGetFeature,
          useValue: {
            execute: jest.fn().mockResolvedValue({} as HTTPResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<ApiPaymentsController>(ApiPaymentsController);
    handlerGetFeature = module.get<HandlerGetFeature>(HandlerGetFeature);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call handlerGetFeature.execute with correct parameters', async () => {
    const email: GetFeatureRequest = {email: 'test@example.com'};
    const result = {} as HTTPResponse;

    jest.spyOn(handlerGetFeature, 'execute').mockResolvedValue(result);

    const response = await controller.getFeature(email);

    expect(handlerGetFeature.execute).toHaveBeenCalledWith(email);
    expect(response).toBe(result);
  });
});
