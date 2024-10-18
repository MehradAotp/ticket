import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './event.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Event } from './events.schema';
import {
  CustomApiResponse,
  CustomApiResponseWithoutSecurity,
  CustomApiResponseWithParam,
} from 'src/decorators/decorator.ApiResponse';
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}
  //Get
  @Get()
  @ApiOperation({
    summary: 'Get All Events',
    description: 'Get All Events',
  })
  @ApiOkResponse({
    description: 'Successfully Fetched All Events',
    type: [Event],
    example: {
      _id: '66fd15ae3802e4409738f01e',
      title: 'Mehrad',
      description: 'Live concert featuring various artists.',
      date: '2024-10-15T19:30:00.000Z',
      location: 'Stadium A',
      price: 50,
    },
  })
  getAllEvent() {
    return this.eventService.getAllEvent();
  }
  //Get:id
  @Get(':id')
  @ApiOperation({
    summary: 'Get Event With ID',
    description: 'Getting the information of a Event with ID.',
  })
  @CustomApiResponseWithoutSecurity('ID of the Event', 'Event not found.')
  @ApiOkResponse({
    description: 'Successfully Fetched Event',
    type: [Event],
    example: {
      _id: '66fd15ae3802e4409738f01e',
      title: 'Mehrad',
      description: 'Live concert featuring various artists.',
      date: '2024-10-15T19:30:00.000Z',
      location: 'Stadium A',
      price: 50,
    },
  })
  getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }
  // Post
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create a new Event',
    description:
      'Creates a new event by providing title, description, date, location, and price.',
    operationId: 'CreateEventDto',
  })
  @ApiBody({
    description: 'Payload to create a new event',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Concert in the Park',
        },
        description: {
          type: 'string',
          example: 'An amazing concert featuring various artists.',
        },
        date: {
          type: 'string',
          format: 'date-time',
          example: '2024-10-25T18:30:00.000Z',
        },
        location: {
          type: 'string',
          example: 'Central Park, New York',
        },
        price: {
          type: 'number',
          example: 50,
        },
      },
    },
  })
  @CustomApiResponse()
  @ApiCreatedResponse({
    description: 'The event has been successfully created.',
  })
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  //Patch
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update Event With ID',
    description: 'Updating the information of a Event with ID.',
  })
  @CustomApiResponseWithParam('ID of the Event', 'Event Not Found')
  updateEvent(@Param('id') id: string, @Body() updateEventDto: CreateEventDto) {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  //Delete
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @CustomApiResponseWithParam('ID of the Event', 'Event Not Found')
  @ApiOperation({
    summary: 'Delete Event With ID',
    description: 'Deleting a Event with ID.',
  })
  deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(id);
  }
}
