import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CustomApiResponse,
  CustomApiResponseWithParam,
} from 'src/decorators/decorator.ApiResponse';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //Post
  @Post()
  @ApiOperation({
    summary: 'Create a new User',
    description: 'Creates a new User by providing Username, Password, Email.',
    operationId: 'createUserDto',
  })
  @ApiBody({
    description: 'Payload to create a new User',
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'Mehrad',
        },
        password: {
          type: 'string',
          example: 'Mehrad123456789',
        },
        email: {
          type: 'string',
          example: 'Mehrad@gmail.com',
        },
      },
    },
  })
  @CustomApiResponse()
  @ApiCreatedResponse({
    description: 'The User has been successfully created.',
  })
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ) {
    return this.usersService.createUser(username, password, email);
  }

  // Delete
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @CustomApiResponseWithParam('ID of the User', 'User Not Found')
  @ApiOperation({
    summary: 'Delete User With ID',
    description: 'Deleting a User with ID.',
  })
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
