import {Module} from '@nestjs/common';
import {CommonsModule} from './common.module';
import {ConfigModule} from './config.module';
import {PaymentsModule} from './payments.module';

@Module({
  imports: [CommonsModule, ConfigModule, PaymentsModule],
})
export class AppModule {}
