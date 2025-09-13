
import { PaymentsDataBaseRepository } from './adapter/out/firestore/payments-database.controller';
import { UtilsDomainDatabase } from './adapter/out/firestore/utils';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { IHealthRepository } from 'domain/src/interface/health.repository';
import { GetHealthUseCase } from 'domain/src/usecase/get-health.usecase';
import { ApiPaymentsController } from './adapter/in/http/api-payments.controller';
import { HealthController } from './adapter/in/http/health.controller';
import { TypeOrmHealthRepository } from './adapter/out/postgres/typeorm-health.repository';
import { HandlerGetServerHealthStatus } from './handler/get-server-health-status.handler';
import { VendorAController } from './adapter/out/vendors/vendorA/vendorA.controller';
import { VendorBController } from './adapter/out/vendors/vendorB/vendorB.controller';
import { PostCreateTransferUseCase } from '../domain/src/usecase/post-create-transfer.usecase';
import { PostCreateTransferHandler } from './handler/post-create-transfer.handler';
import { VendorsController } from './adapter/out/vendors/vendors.controller';
import { IVendors } from 'domain/src/interface/vendors.interface';
import { ILogger } from 'domain/src/interface/logger.interface';
import { NestjsLoggerAdapter } from './adapter/out/logger/nestjs-logger.adapter';

@Module({
  imports: [HttpModule],
  controllers: [HealthController, ApiPaymentsController],
  providers: [
    {
      provide: 'TypeOrmHealthRepository',
      useClass: TypeOrmHealthRepository,
    },
    {
      provide: 'GetHealthUseCase',
      useFactory: (healthRepository: IHealthRepository) => {
        return new GetHealthUseCase(healthRepository);
      },
      inject: ['TypeOrmHealthRepository'],
    },
    {
      provide: 'UtilsDomainDatabase',
      useFactory: (configService: ConfigService) => {
        return new UtilsDomainDatabase(configService);
      },
      inject: [ConfigService],
    },
    {
      provide: 'PaymentsDataBaseRepository',
      useFactory: (utilsDomainDatabase: UtilsDomainDatabase) => {
        return new PaymentsDataBaseRepository(utilsDomainDatabase);
      },
      inject: ['UtilsDomainDatabase'],
    },
    {
      provide: 'IVendors',
      useClass: VendorsController,
    },
    {
      provide: 'ILogger',
      useClass: NestjsLoggerAdapter,
    },
    {
      provide: 'PostCreateTransferUseCase',
      useFactory: (vendors: IVendors, logger: ILogger) => {
        return new PostCreateTransferUseCase(vendors, logger);
      },
      inject: ['IVendors', 'ILogger'],
    },
    {
      provide: 'VendorAController',
      useFactory: (httpService: HttpService) => {
        return new VendorAController(httpService);
      },
      inject: [HttpService],
    },
    {
      provide: 'VendorBController',
      useFactory: (httpService: HttpService) => {
        return new VendorBController(httpService);
      },
      inject: [HttpService],
    },
    VendorsController, // Ensure the main controller is provided
    HandlerGetServerHealthStatus,
    PostCreateTransferHandler,
  ],
})
export class PaymentsModule {}
