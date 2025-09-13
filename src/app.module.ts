import {Module} from '@nestjs/common';
import {CommonsModule} from './common.module';
import {PaymentsModule} from './payments.module';

@Module({
  imports: [CommonsModule, PaymentsModule],
})
export class AppModule {}
