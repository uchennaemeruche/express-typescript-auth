export interface IError {
  statusCode: number;
  fields: {
    name: {
      message: string;
    };
  };
  message: string;
  name: string;
}

export default class APIError extends Error implements IError {
  public statusCode: number;
  public success = false;
  public fields!: { name: { message: string } };

  constructor(message: string, statusCode: number, name: string = 'APIError') {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
    Error.captureStackTrace(this);
  }
}
