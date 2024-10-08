import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './events/events.schema';
import { TicketsModule } from './tickets/tickets.module';
import { TicketSchema } from './tickets/ticket.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/event-management'),
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }]),
    EventsModule,
    TicketsModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
  ],
})
export class AppModule {}
