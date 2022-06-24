export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

class HttpException extends Error {
  public statusCode: HttpStatus;
  public message: string;
  constructor(statusCode: HttpStatus, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
export { HttpException };
