import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {VendorAController} from './vendorA.controller';

@Module({
  imports: [HttpModule],
  providers: [VendorAController],
  exports: [VendorAController],
})
export class VendorAModule {}
