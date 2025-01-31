import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { interfaceName, action } = this.reflector.get<{
      interfaceName: string;
      action: string;
    }>('permission', context.getHandler()) || {
      interfaceName: null,
      action: null,
    };

    if (!interfaceName || !action) {
      return true; // Se não houver necessidade de permissão, permite a execução
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    const permission = await this.prisma.permission.findUnique({
      where: {
        userId_interface: {
          userId: user.id,
          interface: interfaceName,
        },
      },
    });

    if (!permission || !permission[action]) {
      throw new ForbiddenException('Permissão negada');
    }

    return true;
  }
}
