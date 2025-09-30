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
});
