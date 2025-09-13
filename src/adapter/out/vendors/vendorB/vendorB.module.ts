import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {VendorBController} from './vendorB.controller';

@Module({
  imports: [HttpModule],
  providers: [VendorBController],
  exports: [VendorBController],
})
export class VendorBModule {}
