import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	//TODO: improve error handling
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		let errorMessage: string = 'Internal error, unable to process data';
		let error = exception.getResponse();
		let status = exception.getStatus();

		if (exception?.query !== undefined) {
			error = {
				error: exception.originalError.info,
				query: exception.query,
				parameters: exception.parameters,
			};
			status = 400;
		} else {
			status = exception.status > 0 ? exception.status : 400;
			const error = exception.response;
			if (error !== undefined) {
				const isArray = Array.isArray(error['message']);
				errorMessage = isArray ? error['message'][0] : error['message'];
			}
		}

		error.message = errorMessage;

		response.status(status).json(error);
	}
}
