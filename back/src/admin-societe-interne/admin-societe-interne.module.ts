import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSocieteInterne } from 'src/dbConfig/adminSocieteInterne.entity';
import { SocieteInterne } from 'src/dbConfig/societeInterne.entity';
import { AdminSocieteInterneController } from './admin-societe-interne.controller';
import { AdminSocieteInterneService } from './admin-societe-interne.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminSocieteInterne, SocieteInterne])],

  controllers: [AdminSocieteInterneController],
  providers: [AdminSocieteInterneService],
  exports: [AdminSocieteInterneService],
})
export class AdminSocieteInterneModule {}
