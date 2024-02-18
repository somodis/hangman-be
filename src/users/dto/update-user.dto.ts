import { IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
  id: number;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsNumber()
  isInGame?: boolean;
}
