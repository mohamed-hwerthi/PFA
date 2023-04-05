import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employe } from 'src/dbConfig/employe.entity';
import { Mission } from 'src/dbConfig/mission.entity';
import { EmployeModule } from 'src/employe/employe.module';
import { MissionController } from './mission.controller';
import { MissionService } from './mission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mission]),
    EmployeModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'hwerthihammadi@gmail.com',
          pass: 'pmxb qwsx tcvo jxfc',
        },
      },
    }),
  ],
  controllers: [MissionController],
  providers: [MissionService],
})
export class MissionModule {}
