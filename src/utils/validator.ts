/** biome-ignore-all lint/complexity/noStaticOnlyClass: <> */
import { ErrorValidation } from '@/error/error-validation';

export class Validator {
  static notNull(value: unknown, error: string): ErrorValidation | null {
    return value !== null && value !== undefined
      ? null
      : ErrorValidation.create({ value, code: error });
  }
}
