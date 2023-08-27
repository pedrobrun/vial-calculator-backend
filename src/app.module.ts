import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CalculationsModule } from './calculations/calculations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthenticationModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CalculationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
