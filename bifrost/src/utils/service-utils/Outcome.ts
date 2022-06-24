import { HttpException, HttpStatus } from '../http/HttpException';
import { NextFunction, Request, Response, response } from 'express';
import { CookieData } from '../http/cookies';

export type FromTransformer<T> = (data: any) => T;

interface DbTransformerObject<T> {
  from: FromTransformer<T>;
  to: (response: T) => T;
}

interface TransformerObject<T, U = T> {
  from?: FromTransformer<T>;
  to: (response: T) => U;
}

export type DbTransformFunction<T> = () => DbTransformerObject<T>;

export type TransformFunction<T, U = T> = (data?: any) => TransformerObject<T, U>;

class HttpResponse<T> {
  response: T;
  constructor(response: T) {
    this.response = response;
  }
  isSuccess() {
    return !(this.response instanceof HttpException);
  }
  getResponse(): T {
    return this.response;
  }
}

export type ErrorOutcome = (message?: string) => HttpResponse<HttpException>;

export type Success = <T>(response: T) => HttpResponse<T>;

export const success: Success = <T>(response: T) => new HttpResponse<T>(response);

export const badRequest: ErrorOutcome = (message: string = 'Invalid arguments') =>
  new HttpResponse(new HttpException(HttpStatus.BAD_REQUEST, message));

export const notFound: ErrorOutcome = (message: string = 'Resource not found') =>
  new HttpResponse(new HttpException(HttpStatus.NOT_FOUND, message));

export const forbidden: ErrorOutcome = (message: string = 'Forbidden request') =>
  new HttpResponse(new HttpException(HttpStatus.FORBIDDEN, message));

export const unauthorized: ErrorOutcome = (message: string = 'Unauthorized request') =>
  new HttpResponse(new HttpException(HttpStatus.UNAUTHORIZED, message));

export const internalServerError: ErrorOutcome = (message: string = 'An internal error occurred') =>
  new HttpResponse(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, message));

export class ExpressContext {
  public response: Response;
  public next: NextFunction;
  constructor(response: Response, next: NextFunction) {
    this.response = response;
    this.next = next;
  }
}

class Outcome<T = any> {
  private readonly httpResponse: HttpResponse<T>;
  private context: ExpressContext | undefined;
  private cookieData: CookieData[] = [];
  constructor(outcome: HttpResponse<T>, context?: ExpressContext) {
    this.httpResponse = outcome;
    this.context = context;
  }

  withContext(context: ExpressContext) {
    this.context = context;
    return this;
  }

  withTokenCookie(cookieData: CookieData) {
    this.cookieData = this.cookieData.concat([cookieData]);
    return this;
  }

  transformOrThrow(
    convertor: TransformFunction<T> = () => ({
      to: (val: any) => val,
    }),
    middleware: (payload: any) => any = (val) => val
  ): void {
    if (!this.context) throw Error('No context set');
    if (this.httpResponse.isSuccess()) {
      const response = convertor?.().to(this.httpResponse.getResponse());
      this.cookieData.map(({ key, value, maxAge, httpOnly }) => {
        this.context?.response?.cookie(key, value, { maxAge, httpOnly });
      });

      this.context?.response.setHeader('Content-Type', 'application/json');
      this.context?.response.send(middleware(response));
    } else {
      this.context?.next?.(this.httpResponse.getResponse());
    }
  }
}

export { Outcome };
