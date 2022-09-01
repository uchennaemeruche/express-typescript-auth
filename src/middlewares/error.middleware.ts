import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import util from 'util';
import APIError, { IError } from '../abstract_definitions/api_error';

/**
 * catches errors from other middlewares
 * @param err APIError
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export const addErrorHandler = (
  err: APIError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err) {
    const statusCode: number =
      err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    console.debug(`REQUEST HANDLING ERROR: 
    \nERROR:\n${JSON.stringify(err)}
    \nREQUEST HEADERS:\n${util.inspect(req.headers)}
    \nREQUEST PARAMS:\n${util.inspect(req.params)}
    \nREQUEST QUERY:\n${util.inspect(req.query)}
    \nBODY:\n${util.inspect(req.body)}`);

    interface IErrorStack {
      stack: string;
    }
    type IBody = IError & IErrorStack;

    const body: IBody = {
      fields: err.fields,
      message: err.message || 'An error occurred during the request.',
      name: err.name,
      statusCode,
      stack: ''
    };

    body.stack = err.stack || '';

    res.status(statusCode).send(body);
  }
  next();
};
