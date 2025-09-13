import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import {Observable, tap} from 'rxjs';
import {GeneralUtils} from '../utils/general.util';
import {HTTPResponse} from '../../model/dto/http-response.model';

@Injectable()
export class RestInterceptor implements NestInterceptor<HTTPResponse> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<HTTPResponse> {
    const req = context.switchToHttp().getRequest<Request>();
    if (req.url === '/health') return next.handle() as Observable<HTTPResponse>;

    Logger.log(
      `Start execution with trace_id ${GeneralUtils.getTraceId}`,
      req.url
    );

    return next.handle().pipe(
      tap({
        next: () => {
          Logger.log('Execution finished');
        },
      })
    );
  }
}
