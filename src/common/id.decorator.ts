import { Param, ParseIntPipe } from '@nestjs/common';

export function Id(propertyName = 'id') {
  return Param(propertyName, ParseIntPipe);
}
