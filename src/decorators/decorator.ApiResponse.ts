import { applyDecorators } from '@nestjs/common';
import {
  ApiUnauthorizedResponse,
  ApiSecurity,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';

export function CustomApiResponse(errorMassege?: string) {
  return applyDecorators(
    ApiUnauthorizedResponse({ description: 'Unauthorized access.' }),
    ApiSecurity('bearer'),
    ApiBearerAuth(),
    ApiInternalServerErrorResponse({
      description: 'Internal server error.',
    }),
    ApiBadRequestResponse({
      description: 'Invalid input data.',
    }),
    ApiNotFoundResponse({ description: errorMassege }),
  );
}

export function CustomApiResponseWithoutSecurity(
  description,
  errorMassege: string,
) {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: String,
      description: description,
      required: true,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error.',
    }),
    ApiBadRequestResponse({
      description: 'Invalid input data.',
    }),
    ApiNotFoundResponse({
      description: errorMassege,
    }),
  );
}

export function CustomApiResponseWithParam(
  description: string,
  errorMassege: string,
) {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: String,
      description: description,
      required: true,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access.' }),
    ApiSecurity('bearer'),
    ApiBearerAuth(),
    ApiInternalServerErrorResponse({
      description: 'Internal server error.',
    }),
    ApiBadRequestResponse({
      description: 'Invalid input data.',
    }),
    ApiNotFoundResponse({ description: errorMassege }),
  );
}
