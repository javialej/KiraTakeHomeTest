import {ArgumentMetadata} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import * as classTransformer from 'class-transformer';
import {PostCreateTransferPipe} from './post-create-transfer.pipe';
import {CreateTransferDto} from './dto/create-transfer.dto';

describe('PostCreateTransferPipe', () => {
  let pipe: PostCreateTransferPipe;

  beforeEach(() => {
    pipe = new PostCreateTransferPipe();
  });

  it('should return the dto if metatype is not provided', () => {
    const dto: CreateTransferDto = {
      amount: 100,
      vendor: 'test',
      txhash: '0x123',
    };
    const metadata: ArgumentMetadata = {
      metatype: undefined,
      type: 'body',
    };

    const result = pipe.transform(dto, metadata);

    expect(result).toBe(dto);
  });

  it('should transform the dto if metatype is provided', () => {
    const dto: CreateTransferDto = {
      amount: 100,
      vendor: 'test',
      txhash: '0x123',
    };
    const metadata: ArgumentMetadata = {
      metatype: CreateTransferDto,
      type: 'body',
    };
    jest.spyOn(classTransformer, 'plainToInstance').mockReturnValue(dto);

    const result = pipe.transform(dto, metadata);

    expect(result).toEqual(dto);
    expect(plainToInstance).toHaveBeenCalledWith(CreateTransferDto, dto);
  });
});
