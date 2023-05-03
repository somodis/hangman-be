import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiHideProperty()
  @IsString()
  password: string;
}
