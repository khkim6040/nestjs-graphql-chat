import { ApolloError } from 'apollo-server-express';
import { ArgumentsHost, Catch, BadRequestException } from '@nestjs/common';

import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(BadRequestException)
export class GraphQLErrorFilter implements GqlExceptionFilter {
  catch(exception: BadRequestException) {
    const response = exception.getResponse();

    if (typeof response === 'object') {
      // If the response is an object, it means that the error is a validation error
      throw new ApolloError('Validation error', 'VALIDATION_ERROR', response);
    } else {
      throw new ApolloError('Bad Request');
    }
  }
}
