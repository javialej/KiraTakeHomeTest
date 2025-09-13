import {PostCreateTransferMapper} from './post-create-transfer.mapper';
import {CreateTransferDto} from '../../adapter/in/http/dto/create-transfer.dto';
import {
  VendorRequest,
  VendorResponse,
} from '../../../domain/src/interface/vendors.interface';

describe('PostCreateTransferMapper', () => {
  it('should map from DTO to model', () => {
    const dto: CreateTransferDto = {
      amount: 100,
      txhash: '0x123',
    };
    const model: VendorRequest = PostCreateTransferMapper.toModel(dto);
    expect(model).toEqual(dto);
  });

  it('should map from model to DTO', () => {
    const model: VendorResponse = {
      status: 'CONFIRMED',
      transactionId: '0xabc',
      provider: 'BlockchainVendorA',
      rawData: {},
    };
    const dto = PostCreateTransferMapper.toDTO(model);
    expect(dto).toEqual(model);
  });
});
