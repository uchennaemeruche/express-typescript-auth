export interface IError {
  status: number;
  fields: {
    name: {
      message: string;
    };
  };
  message: string;
  name: string;
}

export default class APIError extends Error implements IError {
  public status = 500;
  public success = false;
  public fields: { name: { message: string } };

  constructor(message: string, statusCode: number, name: string = 'APIError') {
    super();
    this.message = message;
    this.status = statusCode;
    this.name = name;
  }
}
