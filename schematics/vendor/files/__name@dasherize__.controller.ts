import { Controller } from '@nestjs/common';
import { IVendors } from '../../../../../../domain/src/interface/vendors.interface';
import { VendorResponse } from '../../../../../../domain/src/model/payments.type';

@Controller()
export class <%= pascalName %>Controller implements IVendors {
  initiateTransfer(amount: number, txhash: string): Promise<VendorResponse> {
    // TODO: Implement the logic for <%= pascalName %>
    console.log('Initiating transfer with <%= pascalName %>', { amount, txhash });
    // Mock response
    return Promise.resolve({
      status: 'CONFIRMED',
      transactionId: 'mock-id-<%= name %>',
      provider: '<%= pascalName %>',
      rawData: {},
    });
  }
}
