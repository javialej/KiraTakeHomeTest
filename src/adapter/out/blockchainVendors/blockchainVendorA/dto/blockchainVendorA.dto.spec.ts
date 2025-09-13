import {VendorARequestDto, VendorAResponseDto} from './blockchainVendorA.dto';

describe('BlockchainVendorA DTOs', () => {
  it('should create a request DTO', () => {
    const dto = new VendorARequestDto();
    Object.defineProperty(dto, 'transactionId', {value: '0x123'});
    Object.defineProperty(dto, 'amount', {value: 100});
    Object.defineProperty(dto, 'currency', {value: 'USD'});

    expect(dto.transactionId).toEqual('0x123');
    expect(dto.amount).toEqual(100);
    expect(dto.currency).toEqual('USD');
  });

  it('should create a response DTO', () => {
    const dto = new VendorAResponseDto();
    Object.defineProperty(dto, 'status', {value: 'CONFIRMED'});
    Object.defineProperty(dto, 'confirmationId', {value: '0xabc'});

    expect(dto.status).toEqual('CONFIRMED');
    expect(dto.confirmationId).toEqual('0xabc');
  });
});
