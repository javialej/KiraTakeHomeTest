import {Global, Logger, Module} from '@nestjs/common';
import {firestoreClient} from './adapter/out/firestore/client.connection';
import {HealthController} from './common/config/health.controller';
import {DatabaseModule} from './adapter/out/postgres/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'Logger',
      useValue: new Logger(),
    },
    {
      provide: 'dbClient',
      useValue: firestoreClient,
    },
  ],
  exports: ['dbClient'],
  controllers: [HealthController],
})
export class ConfigModule {}
