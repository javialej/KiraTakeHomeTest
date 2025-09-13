import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateTransferDto {
  @IsNumber()
  @IsPositive()
  readonly amount!: number;

  @IsString()
  @IsOptional()
  readonly vendor?: string;

  @IsString()
  @IsNotEmpty()
  readonly txhash!: string;
}
