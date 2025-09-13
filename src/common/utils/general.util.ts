import * as rTracer from 'cls-rtracer';
import opentelemetry, {Meter, Tracer} from '@opentelemetry/api';

export class GeneralUtils {
  /**
   *
   */
  public static get getTraceId(): string {
    return (rTracer.id() as string) || '';
  }
}

export const getTracer = (): Tracer =>
  opentelemetry.trace.getTracer('default-tracer');

export const getMeter = (): Meter =>
  opentelemetry.metrics.getMeter('default-meter');

export const buildMeterName = (name: string): string =>
  `${process.env.SERVICE_NAME}_${name}`;
