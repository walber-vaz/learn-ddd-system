/** biome-ignore-all lint/complexity/noStaticOnlyClass: <> */
import { ErrorValidation } from '@/error/error-validation';

export class Validator {
  static toCombine(
    ...validators: (ErrorValidation | null)[]
  ): ErrorValidation[] | null {
    const errorsFiltered = validators.filter(
      (error): error is ErrorValidation => error !== null,
    );
    return errorsFiltered.length > 0 ? errorsFiltered : null;
  }

  static notNull(value: unknown, error: string): ErrorValidation | null {
    return value !== null && value !== undefined
      ? null
      : ErrorValidation.create({ value, code: error });
  }

  static notEmpty(
    value: string | null | undefined,
    error: string,
  ): ErrorValidation | null {
    if (Validator.notNull(value, error))
      return ErrorValidation.create({ value, code: error });
    return value?.trim() !== ''
      ? null
      : ErrorValidation.create({ value, code: error });
  }

  static lessWant(
    value: string | unknown[],
    lengthMax: number,
    error: string,
  ): ErrorValidation | null {
    return value.length < lengthMax
      ? null
      : ErrorValidation.create({ value, code: error });
  }

  static lessEqualWant(
    value: string | unknown[],
    lengthMax: number,
    error: string,
  ): ErrorValidation | null {
    return value.length <= lengthMax
      ? null
      : ErrorValidation.create({ value, code: error });
  }

  static greaterWant(
    value: string | unknown[],
    lengthMin: number,
    error: string,
  ): ErrorValidation | null {
    return value.length > lengthMin
      ? null
      : ErrorValidation.create({ value, code: error });
  }

  static greaterEqualWant(
    value: string | unknown[],
    lengthMin: number,
    error: string,
  ): ErrorValidation | null {
    return value.length >= lengthMin
      ? null
      : ErrorValidation.create({ value, code: error });
  }

  static regex(
    value: string,
    regex: RegExp,
    error: string,
  ): ErrorValidation | null {
    return regex.test(value)
      ? null
      : ErrorValidation.create({ value, code: error });
  }
}
