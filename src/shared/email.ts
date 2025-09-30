import { Errors } from '@/constants/errors';
import { ErrorValidation } from '@/error/error-validation';

export class Email {
  static readonly REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  readonly value: string;

  constructor(email?: string) {
    this.value = email ?? '';

    if (!Email.isValid(this.value)) {
      ErrorValidation.throw({ code: Errors.INVALID_EMAIL, value: this.value });
    }
  }

  get username(): string {
    return this.value.split('@')[0];
  }

  get domain(): string {
    return this.value.split('@')[1];
  }

  static isValid(email: string): boolean {
    return Email.REGEX.test(email);
  }
}
