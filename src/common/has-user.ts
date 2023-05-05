import { UserEntity } from 'src/database/entities';

export function hasUser(
  request: Request,
): request is Request & { user: UserEntity } {
  return 'user' in request;
}
