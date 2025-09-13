import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {validate} from './config/env.validation';
import generalConfig from './config/general.config';
import { MetricsService } from './metrics/metrics.service';

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
