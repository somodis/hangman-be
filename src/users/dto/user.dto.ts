import { ApiHideProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/common/role-enum';

export class UserDto {
  @IsString()
  username: string;

  @ApiHideProperty()
  @MinLength(8)
  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsNumber()
  isInGame?: boolean;
}
