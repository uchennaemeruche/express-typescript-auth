import { NextFunction, Request, Response } from 'express';
import APIError from '../abstract_definitions/api_error';
import { addErrorHandler } from './error.middleware';

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
  // eslint-disable-next-line @typescript-eslint/require-await
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
