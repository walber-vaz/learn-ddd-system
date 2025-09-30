import { describe, expect, it } from 'vitest';
import { Errors } from '@/constants/errors';
import { ErrorValidation } from '@/error/error-validation';
import { StrongPassword } from './strong-password';

describe('StrongPassword', () => {
  describe('constructor', () => {
    it('should create a StrongPassword instance for a valid password', () => {
      const validPassword = 'Aa1@aaaa';

      const strongPassword = new StrongPassword(validPassword);
      expect(strongPassword).toBeInstanceOf(StrongPassword);
      expect(strongPassword.value).toBe(validPassword);
    });

    it('should throw an error for an invalid password', () => {
      const invalidPassword = 'weakpass';

      expect(() => new StrongPassword(invalidPassword)).toThrow(
        ErrorValidation,
      );

      try {
        new StrongPassword(invalidPassword);
      } catch (error) {
        expect(error).toBeInstanceOf(ErrorValidation);
        expect((error as ErrorValidation).code).toBe(
          Errors.PASSWORDS_DO_NOT_MATCH,
        );
      }
    });
  });

  describe('isValid method', () => {
    describe('valid passwords', () => {
      it('should accept passwords with all required elements', () => {
        const validPasswords = [
          'Aa1@aaaa',
          'Password123!',
          'MySecure123$',
          'Strong1%',
          'Complex@123Pass',
          'Test!ng123',
          'Admin&456',
          'User*789',
          'Super?Password1',
          'Secret123@456',
          'ABC123def$',
          'aB3@efghijk',
        ];

        validPasswords.forEach((password) => {
          expect(StrongPassword.isValid(password)).toBeTruthy();
        });
      });

      it('should accept passwords at minimum length (8 characters)', () => {
        const minLengthPassword = 'Aa1@bcde';
        expect(StrongPassword.isValid(minLengthPassword)).toBeTruthy();
      });

      it('should accept very long passwords', () => {
        const longPassword = `Aa1@${'a'.repeat(50)}`;
        expect(StrongPassword.isValid(longPassword)).toBeTruthy();
      });

      it('should accept all allowed special characters', () => {
        const specialChars = ['@', '$', '!', '%', '*', '?', '&'];

        specialChars.forEach((char) => {
          const password = `Aa1${char}bcde`;
          expect(StrongPassword.isValid(password)).toBeTruthy();
        });
      });
    });

    describe('invalid passwords - missing requirements', () => {
      it('should reject passwords without lowercase letters', () => {
        const passwords = ['AA1@AAAA', 'PASSWORD123!', 'STRONG@456'];

        passwords.forEach((password) => {
          expect(StrongPassword.isValid(password)).toBeFalsy();
        });
      });

      it('should reject passwords without uppercase letters', () => {
        const passwords = ['aa1@aaaa', 'password123!', 'strong@456'];

        passwords.forEach((password) => {
          expect(StrongPassword.isValid(password)).toBeFalsy();
        });
      });

      it('should reject passwords without numbers', () => {
        const passwords = ['Aa@aaaaa', 'Password!', 'Strong@Pass'];

        passwords.forEach((password) => {
          expect(StrongPassword.isValid(password)).toBeFalsy();
        });
      });

      it('should reject passwords without special characters', () => {
        const passwords = ['Aa1aaaaa', 'Password123', 'Strong456Pass'];

        passwords.forEach((password) => {
          expect(StrongPassword.isValid(password)).toBeFalsy();
        });
      });
    });

    describe('invalid passwords - length requirements', () => {
      it('should reject passwords shorter than 8 characters', () => {
        const shortPasswords = ['Aa1@', 'Aa1@a', 'Aa1@ab', 'Aa1@abc'];

        shortPasswords.forEach((password) => {
          expect(StrongPassword.isValid(password)).toBeFalsy();
        });
      });

      it('should reject empty string', () => {
        expect(StrongPassword.isValid('')).toBeFalsy();
      });
    });

    describe('invalid passwords - forbidden characters', () => {
      it('should reject passwords with spaces', () => {
        const passwordsWithSpaces = [
          'Aa1@ aaaa',
          ' Aa1@aaaa',
          'Aa1@aaaa ',
          'Aa 1@aaaa',
        ];

        passwordsWithSpaces.forEach((password) => {
          expect(StrongPassword.isValid(password)).toBeFalsy();
        });
      });

      it('should reject passwords with forbidden special characters', () => {
        const forbiddenChars = [
          '#',
          '^',
          '(',
          ')',
          '[',
          ']',
          '{',
          '}',
          '|',
          '\\',
          '/',
          '<',
          '>',
          '=',
          '+',
          '-',
          '_',
          '~',
          '`',
          '"',
          "'",
          ',',
          '.',
          ';',
          ':',
        ];

        forbiddenChars.forEach((char) => {
          const password = `Aa1${char}bcde`;
          expect(StrongPassword.isValid(password)).toBeFalsy();
        });
      });
    });

    describe('edge cases', () => {
      it('should handle multiple special characters', () => {
        const password = 'Aa1@$!%*?&bc';
        expect(StrongPassword.isValid(password)).toBeTruthy();
      });

      it('should handle multiple numbers', () => {
        const password = 'Aa123456@bc';
        expect(StrongPassword.isValid(password)).toBeTruthy();
      });

      it('should handle alternating character patterns', () => {
        const password = 'A1a@B2b$C3c!';
        expect(StrongPassword.isValid(password)).toBeTruthy();
      });

      it('should reject passwords with only allowed chars but missing requirements', () => {
        const passwords = [
          'aaaaaaaa',
          'AAAAAAAA',
          '11111111',
          '@@@@@@@@',
          'Aaaaaaaa',
          'A1111111',
          'A@@@@@@@',
          'a1111111',
          'a@@@@@@@',
          '1@@@@@@@',
        ];

        passwords.forEach((password) => {
          expect(StrongPassword.isValid(password)).toBeFalsy();
        });
      });
    });
  });

  describe('regex property', () => {
    it('should expose the regex pattern', () => {
      expect(StrongPassword.regex).toBeInstanceOf(RegExp);
      expect(StrongPassword.regex.source).toBe(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
      );
    });

    it('should be consistent between isValid method and direct regex usage', () => {
      const testPasswords = [
        'Aa1@aaaa',
        'weakpass',
        'PASSWORD123!',
        'password123!',
        'Password!',
        'Password123',
        'Aa1@',
      ];

      testPasswords.forEach((password) => {
        const isValidResult = StrongPassword.isValid(password);
        const regexResult = StrongPassword.regex.test(password);
        expect(isValidResult).toBe(regexResult);
      });
    });
  });
});
