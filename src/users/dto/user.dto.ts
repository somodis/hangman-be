import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/common/role-enum';

export class UserDto {
  @ApiProperty()
  @IsString()
  username: string;

  // @ApiHideProperty()
  @ApiProperty()
  @MinLength(8)
  @IsString()
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  score?: number;

  @IsOptional()
  isInGame?: boolean;
}
