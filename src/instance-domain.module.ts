
import {firestoreClient} from './adapter/out/firestore/client.connection';
import {DomainDataBaseRepository} from './adapter/out/firestore/domain-database.controller';
import {UtilsDomainDatabase} from './adapter/out/firestore/utils';
import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {HttpModule, HttpService} from '@nestjs/axios';
import {IHealthRepository} from 'domain/src/interface/health.repository';
import {GetHealthUseCase} from 'domain/src/usecase/get-health.usecase';
import {GetFeatureUseCase} from '../domain/src/usecase/get-feature.usecase';
import {ApiDomainController} from './adapter/in/http/api-domain.controller';
import {HealthController} from './adapter/in/http/health.controller';
import {TypeOrmHealthRepository} from './adapter/out/postgres/typeorm-health.repository';
import {HandlerGetFeature} from './handler/get-feature.handler';
import {HandlerGetServerHealthStatus} from './handler/get-server-health-status.handler';
import {SlackNotification} from './adapter/out/slack/notification.controller';
import {BackOfficeNotification} from './adapter/out/backoffice/notification.controller';
import {IBackOfficeNotification} from 'domain/src/interface/backoffice-notification.repository';
import { VendorAAdapter } from './adapter/out/vendors/vendorA/vendorA.adapter';
import { VendorBAdapter } from './adapter/out/vendors/vendorB/vendorB.adapter';

@Module({
  imports: [HttpModule],
  controllers: [HealthController, ApiDomainController],
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
      provide: 'DomainDataBaseRepository',
      useFactory: (utilsDomainDatabase: UtilsDomainDatabase) => {
        return new DomainDataBaseRepository(utilsDomainDatabase);
      },
      inject: ['UtilsDomainDatabase'],
    },
    {
      provide: 'SlackNotification',
      useFactory: (httpService: HttpService) => {
        return new SlackNotification(httpService);
      },
      inject: [HttpService],
    },
    {
      provide: 'BackOfficeNotification',
      useFactory: (
        slackNotification: SlackNotification,
        configService: ConfigService
      ) => {
        return new BackOfficeNotification(slackNotification, configService);
      },
      inject: ['SlackNotification', ConfigService],
    },
    {
      provide: 'GetFeatureUseCase',
      useFactory: (
        domainDataBaseRepository: DomainDataBaseRepository,
        backOfficeNotification: IBackOfficeNotification
      ) => {
        return new GetFeatureUseCase(
          domainDataBaseRepository,
          backOfficeNotification
        );
      },
      inject: ['DomainDataBaseRepository', 'BackOfficeNotification'],
    },
    {
      provide: 'VendorAAdapter',
      useFactory: (httpService: HttpService) => {
        return new VendorAAdapter(httpService);
      },
      inject: [HttpService],
    },
    {
      provide: 'VendorBAdapter',
      useFactory: (httpService: HttpService) => {
        return new VendorBAdapter(httpService);
      },
      inject: [HttpService],
    },
    HandlerGetFeature,
    HandlerGetServerHealthStatus,
  ],
})
export class InstanceDomainModule {}
