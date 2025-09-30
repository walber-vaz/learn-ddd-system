import { Errors } from '@/constants/errors';
import { ErrorValidation } from '@/error/error-validation';

export class HashPassword {
  static readonly regex =
    /^\$argon2(id|i|d)\$v=\d+\$m=\d+,t=\d+,p=\d+\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/;

  constructor(readonly value?: string) {
    if (!value || !HashPassword.isValid(value)) {
      ErrorValidation.throw({ code: Errors.INVALID_HASH_PASSWORD, value });
    }
  }

  static isValid(value: string): boolean {
    return HashPassword.regex.test(value);
  }
}
