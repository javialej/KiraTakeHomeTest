export class VendorBRequestDto {
  // Properties specific to VendorB's API request
  readonly paymentId: string;
  readonly destination: {
    readonly name: string;
    readonly account: string;
  };
  readonly details: {
    readonly amount: number;
    readonly currency: string;
  };
}

export class VendorBResponseDto {
  // Properties specific to VendorB's API response
  readonly id: string;
  readonly executionStatus: string;
}
