import { Param, ParseIntPipe } from '@nestjs/common';

export function Id(propertyName: string = 'id') {
  return Param(propertyName, ParseIntPipe);
}
