import { describe, expect, it } from 'vitest';
import { Validator } from './validator';

describe('Validator', () => {
  it('should return null when value is not null or undefined', () => {
    expect(Validator.notNull('test', 'error_code')).toBeNull();
    expect(Validator.notNull(123, 'error_code')).toBeNull();
    expect(Validator.notNull({}, 'error_code')).toBeNull();
    expect(Validator.notNull([], 'error_code')).toBeNull();
    expect(Validator.notNull(false, 'error_code')).toBeNull();
    expect(Validator.notNull(0, 'error_code')).toBeNull();
  });

  it('should return error code when value is null or undefined', () => {
    const msgError = 'error_code';
    const errorNull = Validator.notNull(null, msgError);

    expect(errorNull?.code).toBe(msgError);
  });

  it('should return null when string is not empty', () => {
    expect(Validator.notEmpty('test', 'error_code')).toBeNull();
    expect(Validator.notEmpty('  test  ', 'error_code')).toBeNull();
  });

  it('should return error code when string is empty, null or undefined', () => {
    const msgError = 'error_code';

    const errorEmpty = Validator.notEmpty('', msgError);
    expect(errorEmpty?.code).toBe(msgError);

    const errorSpaces = Validator.notEmpty('   ', msgError);
    expect(errorSpaces?.code).toBe(msgError);

    const errorNull = Validator.notEmpty(null, msgError);
    expect(errorNull?.code).toBe(msgError);

    const errorUndefined = Validator.notEmpty(undefined, msgError);
    expect(errorUndefined?.code).toBe(msgError);
  });

  it('should return null when string length is less than max length', () => {
    expect(Validator.lessWant('test', 10, 'error_code')).toBeNull();
    expect(Validator.lessWant([], 5, 'error_code')).toBeNull();
    expect(Validator.lessWant([1, 2, 3], 5, 'error_code')).toBeNull();
  });

  it('should return error code when string length is greater than or equal to max length', () => {
    const msgError = 'error_code';

    const errorExact = Validator.lessWant('test', 4, msgError);
    expect(errorExact?.code).toBe(msgError);
    const errorGreater = Validator.lessWant('testing', 4, msgError);
    expect(errorGreater?.code).toBe(msgError);

    const errorArrayExact = Validator.lessWant([1, 2, 3], 3, msgError);
    expect(errorArrayExact?.code).toBe(msgError);
    const errorArrayGreater = Validator.lessWant([1, 2, 3, 4, 5], 3, msgError);
    expect(errorArrayGreater?.code).toBe(msgError);
  });

  it('should return null when string length is less than or equal to max length', () => {
    expect(Validator.lessEqualWant('test', 5, 'error_code')).toBeNull();
    expect(Validator.lessEqualWant('test', 4, 'error_code')).toBeNull();
    expect(Validator.lessEqualWant([], 5, 'error_code')).toBeNull();
    expect(Validator.lessEqualWant([1, 2, 3], 5, 'error_code')).toBeNull();
    expect(Validator.lessEqualWant([1, 2, 3], 3, 'error_code')).toBeNull();
  });

  it('should return error code when string length is greater than max length', () => {
    const msgError = 'error_code';

    const errorGreater = Validator.lessEqualWant('testing', 4, msgError);
    expect(errorGreater?.code).toBe(msgError);

    const errorArrayGreater = Validator.lessEqualWant(
      [1, 2, 3, 4, 5],
      3,
      msgError,
    );
    expect(errorArrayGreater?.code).toBe(msgError);
  });

  it('should return null when string length is greater than min length', () => {
    expect(Validator.greaterWant('testing', 3, 'error_code')).toBeNull();
    expect(Validator.greaterWant([1, 2, 3, 4, 5], 3, 'error_code')).toBeNull();
  });

  it('should return error code when string length is less than or equal to min length', () => {
    const msgError = 'error_code';

    const errorExact = Validator.greaterWant('test', 4, msgError);
    expect(errorExact?.code).toBe(msgError);
    const errorLess = Validator.greaterWant('te', 4, msgError);
    expect(errorLess?.code).toBe(msgError);

    const errorArrayExact = Validator.greaterWant([1, 2, 3], 3, msgError);
    expect(errorArrayExact?.code).toBe(msgError);
    const errorArrayLess = Validator.greaterWant([1], 3, msgError);
    expect(errorArrayLess?.code).toBe(msgError);
  });

  it('should return null when string length is greater than or equal to min length', () => {
    expect(Validator.greaterEqualWant('testing', 3, 'error_code')).toBeNull();
    expect(Validator.greaterEqualWant('test', 4, 'error_code')).toBeNull();
    expect(
      Validator.greaterEqualWant([1, 2, 3, 4, 5], 3, 'error_code'),
    ).toBeNull();
    expect(Validator.greaterEqualWant([1, 2, 3], 3, 'error_code')).toBeNull();
  });

  it('should return error code when string length is less than min length', () => {
    const msgError = 'error_code';

    const errorLess = Validator.greaterEqualWant('te', 4, msgError);
    expect(errorLess?.code).toBe(msgError);

    const errorArrayLess = Validator.greaterEqualWant([1], 3, msgError);
    expect(errorArrayLess?.code).toBe(msgError);
  });

  it('should return null when string matches the regex', () => {
    expect(Validator.regex('test', /^test$/, 'error_code')).toBeNull();
    expect(
      Validator.regex('123-456', /^\d{3}-\d{3}$/, 'error_code'),
    ).toBeNull();
  });

  it('should return error code when string does not match the regex', () => {
    const msgError = 'error_code';

    const errorNoMatch = Validator.regex('test', /^nope$/, msgError);
    expect(errorNoMatch?.code).toBe(msgError);

    const errorPartialMatch = Validator.regex('testing', /^test$/, msgError);
    expect(errorPartialMatch?.code).toBe(msgError);

    const errorFormat = Validator.regex('123456', /^\d{3}-\d{3}$/, msgError);
    expect(errorFormat?.code).toBe(msgError);
  });

  it('should combine multiple validators and return null if all pass', () => {
    const result = Validator.toCombine(
      Validator.notNull('test', 'error1'),
      Validator.notEmpty('not empty', 'error2'),
      Validator.lessWant('short', 10, 'error3'),
      Validator.greaterWant('long enough', 5, 'error4'),
      Validator.regex('match', /^match$/, 'error5'),
    );
    expect(result).toBeNull();
  });

  it('should combine multiple validators and return errors if any fail', () => {
    const result = Validator.toCombine(
      Validator.notNull(null, 'error1'),
      Validator.notEmpty('   ', 'error2'),
      Validator.lessWant('this is a very long string', 10, 'error3'),
      Validator.greaterWant('ok', 2, 'error4'),
      Validator.regex('invalid', /^valid$/, 'error5'),
    );
    expect(result).toHaveLength(5);
    expect(result?.map((e) => e.code)).toEqual([
      'error1',
      'error2',
      'error3',
      'error4',
      'error5',
    ]);
  });

  it('should return null when combining only null values', () => {
    const result = Validator.toCombine(null, null, null);
    expect(result).toBeNull();
  });

  it('should filter out null values and return only actual errors', () => {
    const result = Validator.toCombine(
      null,
      Validator.notNull(null, 'error1'),
      null,
      Validator.notEmpty('', 'error2'),
      null,
    );
    expect(result).toHaveLength(2);
    expect(result?.map((e) => e.code)).toEqual(['error1', 'error2']);
  });
});
