
import { Inject, Injectable } from '@nestjs/common';
import { IVendors, VendorRequest, VendorResponse } from '../../../../domain/src/interface/vendors.interface';
import { VendorAController } from './vendorA/vendorA.controller';
import { VendorBController } from './vendorB/vendorB.controller';

@Injectable()
export class VendorsController implements IVendors {
  constructor(
    @Inject('VendorAController') private readonly vendorA: VendorAController,
    @Inject('VendorBController') private readonly vendorB: VendorBController,
  ) {}

  /**
   * Smart routing logic to select the best vendor based on the request.
   * @param {VendorRequest} request The request object for the vendor.
   * @returns {Promise<VendorResponse>} The response from the selected vendor.
   */
  public async requestToVendors(request: VendorRequest): Promise<VendorResponse> {
    // Simple strategy: use Vendor A for amounts <= 100, otherwise use Vendor B.
    if (request.amount <= 100) {
      console.log('Routing to Vendor A');
      return this.vendorA.requestToVendors(request);
    }
    
    console.log('Routing to Vendor B');
    return this.vendorB.requestToVendors(request);
  }
}
