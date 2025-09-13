import {Module} from '@nestjs/common';
import {CommonsModule} from './common/common.module';
import {ConfigModule} from './config.module';
import {InstanceDomainModule} from './instance-domain.module';

@Module({
  imports: [CommonsModule, ConfigModule, InstanceDomainModule],
})
export class AppModule {}
