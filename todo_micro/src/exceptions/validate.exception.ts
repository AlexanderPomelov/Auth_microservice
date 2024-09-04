import { HttpException, HttpStatus } from "@nestjs/common";

export class ValdationException extends HttpException {
  messages: any;
  constructor(response: string | Record<string, any>) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
