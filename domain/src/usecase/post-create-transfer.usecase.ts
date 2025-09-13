
import { IVendors, VendorRequest, VendorResponse } from '../interface/vendors.interface';
import { ILogger } from '../interface/logger.interface';

class PostCreateTransferUseCase {
  constructor(
    private readonly vendors: IVendors,
    private readonly logger: ILogger,
  ) {
    this.logger.log('PostCreateTransferUseCase initialized');
  }

  public async apply(request: VendorRequest): Promise<VendorResponse> {
    this.logger.log(`Starting transfer for txhash: ${request.txhash}`);

    // In a real implementation, this would also involve saving the initial
    // transfer request to the database before calling the vendor.

    // Delegate the vendor selection and API call to the smart router.
    const vendorResponse = await this.vendors.requestToVendors(request);

    this.logger.log(`Successfully processed transfer with vendor: ${vendorResponse.provider}`);

    // After the vendor call, this would update the transfer record
    // with the vendor's response (e.g., status, transactionId).

    return vendorResponse;
  }
}

export { PostCreateTransferUseCase };
