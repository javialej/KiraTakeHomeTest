import {GeneralUtils} from '../../common/utils/general.util';
import {ImetaResponse} from '../interfaces/meta-response.interface';
export class HTTPResponse<T = unknown> {
  public meta: ImetaResponse;
  public code: string;
  public message: string;
  public data?: T;
  public type?: string;

  constructor(
    public status: number,
    code: string,
    message: string,
    data?: T,
    type?: string
  ) {
    this.meta = {
      trace_id: GeneralUtils.getTraceId,
    };
    this.code = code;
    this.message = message;
    this.data = data;
    this.type = type;
  }
}
