import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermission = (interfaceName: string, action: string) =>
  SetMetadata('permission', { interfaceName, action });
