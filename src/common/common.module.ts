import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {validate} from './config/env.validation';
import generalConfig from './config/general.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      load: [generalConfig],
    }),
  ],
  providers: [],
})
export class CommonsModule {}
