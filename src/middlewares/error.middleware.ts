import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import APIError, { IError } from '../abstractions/api_error';

export const addErrorHandler = (
  err: APIError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err) {
    const status: number = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    //  console.debug(`REQUEST HANDLING ERROR:
    //     \nERROR:\n${JSON.stringify(err)}
    //     \nREQUEST HEADERS:\n${util.inspect(req.headers)}
    //     \nREQUEST PARAMS:\n${util.inspect(req.params)}
    //     \nREQUEST QUERY:\n${util.inspect(req.query)}
    //     \nBODY:\n${util.inspect(req.body)}`);

    const body: any = {
      fields: err.fields,
      message: err.message || 'An error occurred during the request.',
      name: err.name,
      status,
      stack: ''
    };
  }
};
