import { Module } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { AuthModule } from './auth.module';
import { PrismaService } from '../../services/prisma.service';

@Module({
  imports: [AuthModule, UserModule],
  providers: [UserService, PrismaService],
})
export class UserModule {}
