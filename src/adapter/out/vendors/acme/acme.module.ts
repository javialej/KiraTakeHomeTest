
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AcmeAdapter } from './acme.adapter';

@Module({
  imports: [HttpModule],
  providers: [AcmeAdapter],
  exports: [AcmeAdapter],
})
export class AcmeModule {}
