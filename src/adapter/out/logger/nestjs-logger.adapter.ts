
import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from '../../../../domain/src/interface/logger.interface';

@Injectable()
export class NestjsLoggerAdapter implements ILogger {
  private readonly logger = new Logger('Application');

  log(message: string) {
    this.logger.log(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
