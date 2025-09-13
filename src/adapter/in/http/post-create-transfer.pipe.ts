import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import {CreateTransferDto} from './dto/create-transfer.dto';

@Injectable()
export class PostCreateTransferPipe
  implements PipeTransform<CreateTransferDto, CreateTransferDto>
{
  transform(
    dto: CreateTransferDto,
    {metatype}: ArgumentMetadata,
  ): CreateTransferDto {
    if (!metatype) {
      return dto;
    }
    // field validation
    return plainToInstance(metatype, dto) as CreateTransferDto;
  }
}
