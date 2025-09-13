export class VendorARequestDto {
  // Properties specific to VendorA's API request
  readonly transactionId!: string;
  readonly amount!: number;
  readonly currency!: string;
}

export class VendorAResponseDto {
  // Properties specific to VendorA's API response
  readonly status!: string;
  readonly confirmationId!: string;
}
