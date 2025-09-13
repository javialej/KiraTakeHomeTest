
import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainVendorsController } from './blockchainVendors.controller';
import { BlockchainVendorAController } from './blockchainVendorA/blockchainVendorA.controller';
import { BlockchainVendorBController } from './blockchainVendorB/blockchainVendorB.controller';
import { VendorRequest } from '../../../../domain/src/interface/vendors.interface';
import { NotFoundException } from '@nestjs/common';

describe('BlockchainVendorsController', () => {
  let controller: BlockchainVendorsController;
  let vendorA: BlockchainVendorAController;
  let vendorB: BlockchainVendorBController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockchainVendorsController,
        {
          provide: 'BlockchainVendorAController',
          useValue: {
            requestToVendors: jest.fn(),
          },
        },
        {
          provide: 'BlockchainVendorBController',
          useValue: {
            requestToVendors: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BlockchainVendorsController>(BlockchainVendorsController);
    vendorA = module.get<BlockchainVendorAController>('BlockchainVendorAController');
    vendorB = module.get<BlockchainVendorBController>('BlockchainVendorBController');
  });

  it('should route to Vendor A if amount is less than or equal to 100', async () => {
    const request: VendorRequest = { amount: 100, txhash: '0x123' };
    await controller.requestToVendors(request);
    expect(vendorA.requestToVendors).toHaveBeenCalledWith(request);
    expect(vendorB.requestToVendors).not.toHaveBeenCalled();
  });

  it('should route to Vendor B if amount is greater than 100', async () => {
    const request: VendorRequest = { amount: 101, txhash: '0x456' };
    await controller.requestToVendors(request);
    expect(vendorB.requestToVendors).toHaveBeenCalledWith(request);
    expect(vendorA.requestToVendors).not.toHaveBeenCalled();
  });

  it('should use Vendor B as the default catch-all', async () => {
    const request: VendorRequest = { amount: 500, txhash: '0x789' };
    await controller.requestToVendors(request);
    expect(vendorB.requestToVendors).toHaveBeenCalledWith(request);
    expect(vendorA.requestToVendors).not.toHaveBeenCalled();
  });

  it('should throw a NotFoundException if no suitable vendor is found', async () => {
    // This case is theoretical in the current implementation, as Vendor B is a catch-all.
    // To test this, we would need to remove the catch-all strategy.
    // For now, we can simulate an empty strategies array.
    (controller as any).strategies = [];
    const request: VendorRequest = { amount: 100, txhash: '0x123' };
    await expect(controller.requestToVendors(request)).rejects.toThrow(NotFoundException);
  });
});
