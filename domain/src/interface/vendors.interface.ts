export interface VendorRequest {
  amount: number;
  vendor: string;
  txhash: string;
  [key: string]: unknown;
}

export interface VendorResponse {
  status: string;
  transactionId: string;
  provider: string;
  rawData: unknown;
}

export interface IVendors {
  /**
   *
   * Sends a request to a specific vendor.
   * @param {VendorRequest} request The request object for the vendor.
   */
  requestToVendors(request: VendorRequest): Promise<VendorResponse>;
}
