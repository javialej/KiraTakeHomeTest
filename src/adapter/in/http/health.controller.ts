import {Controller, Get, HttpStatus} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {HTTPResponse} from '../../../model/dto/http-response.model';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  checkHealth(): HTTPResponse {
    return new HTTPResponse(HttpStatus.OK, 'OK', "I'm alive!");
  }
}
