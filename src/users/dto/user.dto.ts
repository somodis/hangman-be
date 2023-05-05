import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Role } from 'src/common/role-enum';

export class UserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiHideProperty()
  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;

  // todo: többi prop?
}
