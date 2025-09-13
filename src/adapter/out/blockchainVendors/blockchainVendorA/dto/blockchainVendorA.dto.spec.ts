
import { VendorARequestDto, VendorAResponseDto } from './blockchainVendorA.dto';

describe('BlockchainVendorA DTOs', () => {
  it('should create a request DTO', () => {
    const dto = new VendorARequestDto();
    (dto as any).transactionId = '0x123';
    (dto as any).amount = 100;
    (dto as any).currency = 'USD';

    expect(dto.transactionId).toEqual('0x123');
    expect(dto.amount).toEqual(100);
    expect(dto.currency).toEqual('USD');
  });

  it('should create a response DTO', () => {
    const dto = new VendorAResponseDto();
    (dto as any).status = 'CONFIRMED';
    (dto as any).confirmationId = '0xabc';

    expect(dto.status).toEqual('CONFIRMED');
    expect(dto.confirmationId).toEqual('0xabc');
  });
});
