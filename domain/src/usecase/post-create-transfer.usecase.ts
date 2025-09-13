
import { IVendors, VendorRequest, VendorResponse } from '../interface/vendors.interface';

class PostCreateTransferUseCase {
  constructor(private readonly vendors: IVendors) {}

  public async apply(request: VendorRequest): Promise<VendorResponse> {
    // In a real implementation, this would also involve saving the initial
    // transfer request to the database before calling the vendor.

    // Delegate the vendor selection and API call to the smart router.
    const vendorResponse = await this.vendors.requestToVendors(request);

    // After the vendor call, this would update the transfer record
    // with the vendor's response (e.g., status, transactionId).

    return vendorResponse;
  }
}

export { PostCreateTransferUseCase };
