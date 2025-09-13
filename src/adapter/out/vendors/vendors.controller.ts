
import {Inject, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { IVendors, VendorRequest, VendorResponse } from '../../../../domain/src/interface/vendors.interface';
import { VendorAController } from './vendorA/vendorA.controller';
import { VendorBController } from './vendorB/vendorB.controller';
// import { VendorCController } from './vendorC/vendorC.controller'; // Placeholder for VendorC

interface VendorStrategy {
  name: string;
  condition: (request: VendorRequest) => boolean;
  handler: IVendors;
}

@Injectable()
export class VendorsController implements IVendors {
  private strategies: VendorStrategy[];

  constructor(
    @Inject('VendorAController') private readonly vendorA: VendorAController,
    @Inject('VendorBController') private readonly vendorB: VendorBController,
    // @Inject('VendorCController') private readonly vendorC: VendorCController, // Placeholder for VendorC
  ) {
    this.strategies = [
      {
        name: 'VendorA',
        condition: (request) => request.amount <= 100,
        handler: this.vendorA,
      },
      // {
      //   name: 'VendorC',
      //   condition: (request) => request.amount > 500, // Example condition for VendorC
      //   handler: this.vendorC,
      // },
      {
        name: 'VendorB',
        condition: () => true, // Default catch-all strategy
        handler: this.vendorB,
      },
    ];
  }

  /**
   * Smart routing logic to select the best vendor based on a dynamic strategy map.
   * @param {VendorRequest} request The request object for the vendor.
   * @returns {Promise<VendorResponse>} The response from the selected vendor.
   */
  public async requestToVendors(request: VendorRequest): Promise<VendorResponse> {
    const strategy = this.strategies.find(s => s.condition(request));

    if (strategy) {
      Logger.log(`Routing to ${strategy.name}`);
      return strategy.handler.requestToVendors(request);
    }

    throw new NotFoundException('No suitable vendor found for this request.');
  }
}
