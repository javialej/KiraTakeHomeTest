import {PaymentsDataBaseRepository} from './adapter/out/firestore/payments-database.controller';
import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {HttpModule, HttpService} from '@nestjs/axios';
import {ApiPaymentsController} from './adapter/in/http/api-payments.controller';
import {BlockchainVendorAController} from './adapter/out/blockchainVendors/blockchainVendorA/blockchainVendorA.controller';
import {BlockchainVendorBController} from './adapter/out/blockchainVendors/blockchainVendorB/blockchainVendorB.controller';
import {PostCreateTransferUseCase} from '../domain/src/usecase/post-create-transfer.usecase';
import {PostCreateTransferHandler} from './handler/post-create-transfer.handler';
import {BlockchainVendorsController} from './adapter/out/blockchainVendors/blockchainVendors.controller';
import {IVendors} from 'domain/src/interface/vendors.interface';
import {ILogger} from 'domain/src/interface/logger.interface';
import {CommonsModule} from './common.module';
import {LoggerService} from './common/logger/logger.service';

import {HealthController} from './adapter/in/http/health.controller';

@Module({
  imports: [HttpModule, CommonsModule],
  controllers: [ApiPaymentsController, HealthController],
  providers: [
    {
      provide: 'PaymentsDataBaseRepository',
      useFactory: (configService: ConfigService) => {
        return new PaymentsDataBaseRepository(configService);
      },
      inject: [ConfigService],
    },
    {
      provide: 'IVendors',
      useClass: BlockchainVendorsController,
    },
    {
      provide: 'ILogger',
      useClass: LoggerService,
    },
    {
      provide: 'PostCreateTransferUseCase',
      useFactory: (vendors: IVendors, logger: ILogger) => {
        return new PostCreateTransferUseCase(vendors, logger);
      },
      inject: ['IVendors', 'ILogger'],
    },
    {
      provide: 'BlockchainVendorAController',
      useFactory: (httpService: HttpService) => {
        return new BlockchainVendorAController(httpService);
      },
      inject: [HttpService],
    },
    {
      provide: 'BlockchainVendorBController',
      useFactory: (httpService: HttpService) => {
        return new BlockchainVendorBController(httpService);
      },
      inject: [HttpService],
    },
    BlockchainVendorsController, // Ensure the main controller is provided
    PostCreateTransferHandler,
  ],
})
export class PaymentsModule {}
