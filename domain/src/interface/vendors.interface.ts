
export interface VendorRequest {
  amount: number;
  vendor: string;
  txhash: string;
  [key: string]: any;
}

export interface VendorResponse {
  status: string;
  transactionId: string;
  provider: string;
  rawData: any;
}

export interface IVendors {
  /**
   *
   * Sends a request to a specific vendor.
   * @param {VendorRequest} request The request object for the vendor.
   */
  requestToVendors(request: VendorRequest): Promise<VendorResponse>;
}
