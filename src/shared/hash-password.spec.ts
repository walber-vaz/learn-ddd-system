import * as argon2 from 'argon2';
import { describe, expect, it } from 'vitest';
import { Errors } from '@/constants/errors';
import { HashPassword } from './hash-password';

describe('HashPassword', () => {
  it('should throw error password is number', () => {
    expect(() => new HashPassword('123')).toThrowError(
      Errors.INVALID_HASH_PASSWORD,
    );
  });

  it('should throw error password is empty', () => {
    expect(() => new HashPassword('')).toThrowError(
      Errors.INVALID_HASH_PASSWORD,
    );
  });

  it('should hash valid password', () => {
    expect(async () => await argon2.hash('ValidPassword123!')).not.toThrow();
  });
});
