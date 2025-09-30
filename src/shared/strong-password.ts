import { Errors } from '@/constants/errors';
import { ErrorValidation } from '@/error/error-validation';

export class StrongPassword {
  static readonly regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor(readonly value?: string) {
    if (!StrongPassword.isValid(value ?? '')) {
      throw ErrorValidation.throw({
        code: Errors.PASSWORDS_DO_NOT_MATCH,
      });
    }
  }

  static isValid(password: string): boolean {
    return StrongPassword.regex.test(password);
  }
}
