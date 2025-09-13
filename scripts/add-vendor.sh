#!/bin/bash

# This script automates the creation of a new vendor module.
# Usage: ./scripts/add-vendor.sh VendorC

set -e

VENDOR_NAME=$1
LOWER_VENDOR_NAME=$(echo "$VENDOR_NAME" | tr '[:upper:]' '[:lower:]')
PASCAL_VENDOR_NAME="Blockchain${VENDOR_NAME}"
MODULE_PATH="src/adapter/out/blockchainVendors"
VENDOR_PATH="${MODULE_PATH}/${LOWER_VENDOR_NAME}"

if [ -z "$VENDOR_NAME" ]; then
  echo "Error: Vendor name is required."
  echo "Usage: $0 <VendorName>"
  exit 1
fi

echo "Creating new vendor: ${PASCAL_VENDOR_NAME}"

# 1. Create directory structure
mkdir -p "${VENDOR_PATH}/dto"

# 2. Create Controller
cat > "${VENDOR_PATH}/${LOWER_VENDOR_NAME}.controller.ts" << EOL
import { Controller } from '@nestjs/common';
import { IVendors } from '../../../../../../domain/src/interface/vendors.interface';
import { VendorResponse } from '../../../../../../domain/src/model/payments.type';

@Controller()
export class ${PASCAL_VENDOR_NAME}Controller implements IVendors {
  initiateTransfer(amount: number, txhash: string): Promise<VendorResponse> {
    // TODO: Implement the logic for ${PASCAL_VENDOR_NAME}
    console.log('Initiating transfer with ${PASCAL_VENDOR_NAME}', { amount, txhash });
    // Mock response
    return Promise.resolve({
      status: 'CONFIRMED',
      transactionId: 'mock-id-${LOWER_VENDOR_NAME}',
      provider: '${PASCAL_VENDOR_NAME}',
      rawData: {},
    });
  }
}
EOL

# 3. Create DTO
cat > "${VENDOR_PATH}/dto/${LOWER_VENDOR_NAME}.dto.ts" << EOL
// TODO: Add any specific DTOs for ${PASCAL_VENDOR_NAME} if needed.
export class ${PASCAL_VENDOR_NAME}RequestDto {}
export class ${PASCAL_VENDOR_NAME}ResponseDto {}
EOL

# 4. Create Controller Spec
cat > "${VENDOR_PATH}/${LOWER_VENDOR_NAME}.controller.spec.ts" << EOL
import { Test, TestingModule } from '@nestjs/testing';
import { ${PASCAL_VENDOR_NAME}Controller } from './${LOWER_VENDOR_NAME}.controller';

describe('${PASCAL_VENDOR_NAME}Controller', () => {
  let controller: ${PASCAL_VENDOR_NAME}Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [${PASCAL_VENDOR_NAME}Controller],
    }).compile();

    controller = module.get<${PASCAL_VENDOR_NAME}Controller>(${PASCAL_VENDOR_NAME}Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
EOL

# 5. Update payments.module.ts to register the new controller
PAYMENTS_MODULE_FILE="src/payments.module.ts"
IMPORT_STATEMENT="import { ${PASCAL_VENDOR_NAME}Controller } from './adapter/out/blockchainVendors/${LOWER_VENDOR_NAME}/${LOWER_VENDOR_NAME}.controller';"
PROVIDER_LINE="    ${PASCAL_VENDOR_NAME}Controller,"

# Add the import statement
sed -i '' "1i\
${IMPORT_STATEMENT}
" ${PAYMENTS_MODULE_FILE}

# Add the provider to the providers array
sed -i '' "/^ *providers: \[/a\
${PROVIDER_LINE}
" ${PAYMENTS_MODULE_FILE}

echo "Vendor ${PASCAL_VENDOR_NAME} created successfully!"
echo "Next steps:"
echo "1. Implement the transfer logic in ${VENDOR_PATH}/${LOWER_VENDOR_NAME}.controller.ts"
echo "2. Update the DTOs in ${VENDOR_PATH}/dto/${LOWER_VENDOR_NAME}.dto.ts"
echo "3. Add comprehensive tests in ${VENDOR_PATH}/${LOWER_VENDOR_NAME}.controller.spec.ts"
echo "4. Update src/adapter/out/blockchainVendors/blockchainVendors.controller.ts to include routing logic for the new vendor."
