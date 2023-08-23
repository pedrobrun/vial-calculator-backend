import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception.response?.message || exception.message || exception.msg || null;

    const path = httpAdapter.getRequestUrl(ctx.getRequest());

    const exceptionRawObject =
      Object.keys(exception).length > 0 ? exception : exception.toString();
    const stack = exception instanceof Error ? exception.stack : null;

    const timestamp = new Date().toISOString();

    const baseResponseBody = {
      statusCode: httpStatus,
      timestamp,
      // name,
      path,
      // raw: exceptionRawObject,
    };

    Logger.error({ error: exceptionRawObject, stack });
    if (
      exception.name === 'PrismaClientKnownRequestError' &&
      exception.code === 'P2002'
    ) {
      // example of the field that comes inside the exception, from which we can know the
      // key of the error: { meta: { target: '<Model-name>_name_key' }, ...restOfTheException }
      const key = exception.meta.target.split('_')[1];
      const { statusCode, ...rest } = baseResponseBody;
      statusCode;

      return httpAdapter.reply(
        ctx.getResponse(),
        {
          message: `${key} already exists`,
          ...rest,
        },
        400,
      );
    }

    const responseBody = {
      message,
      ...baseResponseBody,
    };
    return httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
