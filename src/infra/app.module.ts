import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './http/bot.module';
import { TicketModule } from './http/ticket.module';
import { WebhookModule } from './http/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BotModule,
    TicketModule,
    WebhookModule,
  ],
})
export class AppModule {}
