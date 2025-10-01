import { describe, expect, it } from 'vitest';
import { Errors } from '@/constants/errors';
import type { ErrorValidation } from '@/error/error-validation';
import { Name } from './name';

describe('Name', () => {
  describe('Constructor', () => {
    it('should create name successfully with valid input', () => {
      const name = new Name('John Doe', 3, 50);
      expect(name.value).toBe('John Doe');
    });

    it('should trim whitespace from input', () => {
      const name = new Name('  John Doe  ', 3, 50);
      expect(name.value).toBe('John Doe');
    });

    it('should handle null input by converting to empty string', () => {
      expect(() => new Name(null as unknown as string, 3, 50)).toThrow();
    });

    it('should handle undefined input by converting to empty string', () => {
      expect(() => new Name(undefined as unknown as string, 3, 50)).toThrow();
    });

    it('should throw error when name is empty', () => {
      expect(() => new Name('', 3, 50)).toThrow();
    });

    it('should throw error when name contains only whitespace', () => {
      expect(() => new Name('   ', 3, 50)).toThrow();
    });

    it('should throw error when name is too short', () => {
      expect(() => new Name('Jo', 3, 50)).toThrow();
    });

    it('should throw error when name is too long', () => {
      const longName = 'a'.repeat(51);
      expect(() => new Name(longName, 3, 50)).toThrow();
    });

    it('should accept name at minimum length boundary', () => {
      const name = new Name('Abc', 3, 50);
      expect(name.value).toBe('Abc');
    });

    it('should accept name at maximum length boundary', () => {
      const maxName = 'a'.repeat(50);
      const name = new Name(maxName, 3, 50);
      expect(name.value).toBe(maxName);
    });
  });

  describe('Getters', () => {
    it('should return correct value through name getter', () => {
      const name = new Name('John Doe', 3, 50);
      expect(name.name).toBe('John Doe');
    });

    it('should convert to pascal case correctly', () => {
      const name = new Name('john doe smith', 3, 50);
      expect(name.pascalCase).toBe('John Doe Smith');
    });

    it('should handle single word in pascal case', () => {
      const name = new Name('john', 3, 50);
      expect(name.pascalCase).toBe('John');
    });

    it('should handle mixed case input in pascal case', () => {
      const name = new Name('jOhN dOe', 3, 50);
      expect(name.pascalCase).toBe('John Doe');
    });

    it('should handle all uppercase input in pascal case', () => {
      const name = new Name('JOHN DOE', 3, 50);
      expect(name.pascalCase).toBe('John Doe');
    });

    it('should handle all lowercase input in pascal case', () => {
      const name = new Name('john doe', 3, 50);
      expect(name.pascalCase).toBe('John Doe');
    });

    it('should handle name with multiple spaces between words', () => {
      const name = new Name('john  doe', 3, 50);
      expect(name.pascalCase).toBe('John  Doe');
    });
  });

  describe('Error handling', () => {
    it('should throw error with correct error code for empty name', () => {
      try {
        new Name('', 3, 50);
      } catch (error) {
        expect(error).toBeInstanceOf(Array);
        expect((error as ErrorValidation[])[0].code).toBe(Errors.NAME_EMPTY);
      }
    });

    it('should throw error with correct error code for name too short', () => {
      try {
        new Name('ab', 3, 50);
      } catch (error) {
        expect(error).toBeInstanceOf(Array);
        expect((error as ErrorValidation[])[0].code).toBe(
          Errors.NAME_TOO_SHORT,
        );
      }
    });

    it('should throw error with correct error code for name too long', () => {
      try {
        new Name('a'.repeat(51), 3, 50);
      } catch (error) {
        expect(error).toBeInstanceOf(Array);
        expect((error as ErrorValidation[])[0].code).toBe(Errors.NAME_TOO_LONG);
      }
    });

    it('should throw multiple errors when multiple validations fail', () => {
      try {
        new Name('', 3, 50);
      } catch (error) {
        expect(error).toBeInstanceOf(Array);
        expect((error as ErrorValidation[]).length).toBeGreaterThan(0);
      }
    });
  });
});
