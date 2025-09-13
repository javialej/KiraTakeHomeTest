
import {Inject, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { IVendors, VendorRequest, VendorResponse } from '../../../../domain/src/interface/vendors.interface';
import { BlockchainVendorAController } from './blockchainVendorA/blockchainVendorA.controller';
import { BlockchainVendorBController } from './blockchainVendorB/blockchainVendorB.controller';
// import { BlockchainVendorCController } from './vendorC/vendorC.controller'; // Placeholder for VendorC

interface VendorStrategy {
  name: string;
  condition: (request: VendorRequest) => boolean;
  handler: IVendors;
}

@Injectable()
export class BlockchainVendorsController implements IVendors {
  private strategies: VendorStrategy[];

  constructor(
    @Inject('BlockchainVendorAController') private readonly vendorA: BlockchainVendorAController,
    @Inject('BlockchainVendorBController') private readonly vendorB: BlockchainVendorBController,
    // @Inject('BlockchainVendorCController') private readonly vendorC: BlockchainVendorCController, // Placeholder for VendorC
  ) {
    this.strategies = [
      {
        name: 'BlockchainVendorA',
        condition: (request) => request.amount <= 100,
        handler: this.vendorA,
      },
      {
        name: 'BlockchainVendorB',
        condition: () => true, // Default catch-all strategy
        handler: this.vendorB,
      },
      // {
      //   name: 'BlockchainVendorC',
      //   condition: (request) => request.amount > 500, // Example condition for VendorC
      //   handler: this.vendorC,
      // },
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
