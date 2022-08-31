/* eslint-disable @typescript-eslint/require-await */
import { NextFunction, Request, Response } from 'express';
import APIError from '../abstractions/api_error';
import { addErrorHandler } from './error.middleware';

// const authorizationMiddleware = (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ): void => {
//   if (!request.headers || !request.headers['authorization']) {
//     response.statusCode = 403;
//     response.json({
//       error: "Missing JWT token from the 'Authorization' header"
//     });
//   } else {
//     next();
//   }
// };

describe('Error Middleware Handler', () => {
  let mockRequest: Partial<Request> = {};
  let mockResponse: Partial<Response> = {};
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      params: {
        test: 'jo'
      },
      body: {},
      query: {}
    };
    mockResponse = {
      //   eslint-disable-next-line @typescript-eslint/no-explicit-any
      status(code): any {
        this.statusCode = code;
        return this;
      },
      send: jest.fn(),
      json: jest.fn()
    };
  });
  test('Error Thrown', async () => {
    addErrorHandler(
      new APIError('A new Error occured', 400),
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.statusCode).toBeDefined();
    expect(mockResponse.statusCode).toBe(400);
  });
});
