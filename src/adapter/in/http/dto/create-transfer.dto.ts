import {IsString, IsNotEmpty, IsNumber, IsPositive} from 'class-validator';

export class CreateTransferDto {
  @IsNumber()
  @IsPositive()
  readonly amount!: number;

  @IsString()
  @IsNotEmpty()
  readonly vendor!: string;

  @IsString()
  @IsNotEmpty()
  readonly txhash!: string;
}
