// --/ <reference path='function-name.d.ts'/>
export default class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
