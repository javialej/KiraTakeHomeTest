
import { VendorBRequestDto, VendorBResponseDto } from './blockchainVendorB.dto';

describe('BlockchainVendorB DTOs', () => {
  it('should create a request DTO', () => {
    const dto = new VendorBRequestDto();
    (dto as any).paymentId = '0x456';
    (dto as any).destination = {
      name: 'test',
      account: '123',
    };
    (dto as any).details = {
      amount: 200,
      currency: 'COP',
    };

    expect(dto.paymentId).toEqual('0x456');
    expect(dto.destination).toEqual({
      name: 'test',
      account: '123',
    });
    expect(dto.details).toEqual({
      amount: 200,
      currency: 'COP',
    });
  });

  it('should create a response DTO', () => {
    const dto = new VendorBResponseDto();
    (dto as any).id = '0xdef';
    (dto as any).executionStatus = 'FINALIZED';

    expect(dto.id).toEqual('0xdef');
    expect(dto.executionStatus).toEqual('FINALIZED');
  });
});
