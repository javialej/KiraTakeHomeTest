import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {validate} from './common/config/env.validation';
import generalConfig from './common/config/general.config';
import {MetricsService} from './common/metrics/metrics.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      load: [generalConfig],
    }),
  ],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class CommonsModule {}
