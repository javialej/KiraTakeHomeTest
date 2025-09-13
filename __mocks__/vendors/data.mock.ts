
export const vendorAMockSuccessResponse = {
  status: 'CONFIRMED',
  confirmationId: '0x' + require('crypto').randomBytes(32).toString('hex'),
};

export const vendorBMockSuccessResponse = {
  id: '0x' + require('crypto').randomBytes(32).toString('hex'),
  executionStatus: 'FINALIZED',
};
