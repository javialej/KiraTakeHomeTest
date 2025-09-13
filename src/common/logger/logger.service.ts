import {Injectable, ConsoleLogger} from '@nestjs/common';
import * as rtracer from 'cls-rtracer';
import {ILogger} from '../../../domain/src/interface/logger.interface';

@Injectable()
export class LoggerService extends ConsoleLogger implements ILogger {
  override log(message: unknown, context?: string) {
    this.printMessage('info', message, context);
  }

  override error(message: unknown, trace?: string, context?: string) {
    const errorMessage = message instanceof Error ? message.message : message;
    const stackTrace = message instanceof Error ? message.stack : trace;
    this.printMessage('error', errorMessage, context, stackTrace);
  }

  override warn(message: unknown, context?: string) {
    this.printMessage('warn', message, context);
  }

  override debug(message: unknown, context?: string) {
    this.printMessage('debug', message, context);
  }

  private printMessage(
    severity: string,
    message: unknown,
    context?: string,
    trace?: string
  ) {
    const traceId = rtracer.id();
    const logObject = {
      severity: severity.toUpperCase(),
      message: typeof message === 'object' ? JSON.stringify(message) : message,
      context: context ?? this.context,
      trace_id: traceId,
      timestamp: new Date().toISOString(),
      ...(trace && {stack_trace: trace}),
    };
    process.stdout.write(`${JSON.stringify(logObject)}
`);
  }
}
