import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import * as prisma from '../../../generated/prisma';

@Injectable()
export class PrismaService extends prisma.PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
