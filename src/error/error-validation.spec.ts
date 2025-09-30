import { describe, expect, it } from 'vitest';
import { Errors } from '@/constants/errors';
import { ErrorValidation } from './error-validation';

describe('ErrorValidation', () => {
  it('should throw an ErrorValidation', () => {
    expect(() =>
      ErrorValidation.throw({ code: 'TEST_ERROR', value: 'test' }),
    ).toThrowError('TEST_ERROR');
  });

  it('should create error with message and code', () => {
    const error = ErrorValidation.create({
      code: Errors.INVALID_EMAIL,
      value: 'invalid@',
    });

    expect(error).toBeInstanceOf(ErrorValidation);
    expect(error.value).toBe('invalid@');
    expect(error.code).toBe(Errors.INVALID_EMAIL);
    expect(error.message).toBe('INVALID_EMAIL');
  });

  it('should create error with extras property', () => {
    const error = ErrorValidation.create({
      code: Errors.NAME_TOO_SHORT,
      value: 'Jo',
      extras: { minLength: 3 },
    });

    expect(error).toBeInstanceOf(ErrorValidation);
    expect(error.value).toBe('Jo');
    expect(error.code).toBe(Errors.NAME_TOO_SHORT);
    expect(error.extras).toEqual({ minLength: 3 });
    expect(error.message).toBe('NAME_TOO_SHORT');
  });

  it('should create error with default UNKNOWN_ERROR code', () => {
    const error = ErrorValidation.create({ value: 'some value' });

    expect(error).toBeInstanceOf(ErrorValidation);
    expect(error.value).toBe('some value');
    expect(error.code).toBe(Errors.UNKNOWN_ERROR);
    expect(error.message).toBe('UNKNOWN_ERROR');
  });
});
