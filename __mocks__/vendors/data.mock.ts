import * as crypto from 'crypto';

export const vendorAMockSuccessResponse = {
  status: 'CONFIRMED',
  confirmationId: '0x' + crypto.randomBytes(32).toString('hex'),
};

export const vendorBMockSuccessResponse = {
  id: '0x' + crypto.randomBytes(32).toString('hex'),
  executionStatus: 'FINALIZED',
};
