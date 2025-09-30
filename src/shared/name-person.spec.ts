import { describe, expect, it } from 'vitest';
import { Errors } from '@/constants/errors';
import type { ErrorValidation } from '@/error/error-validation';
import { NamePerson } from './name-person';

describe('NamePerson', () => {
  describe('constructor', () => {
    it('should create a valid NamePerson with a proper full name', () => {
      const name = new NamePerson('João Silva');

      expect(name.name).toBe('João Silva');
      expect(name.fullName).toBe('João Silva');
    });

    it('should trim whitespace from the name', () => {
      const name = new NamePerson('  João Silva  ');

      expect(name.name).toBe('João Silva');
    });

    it('should handle undefined name as empty string', () => {
      expect(() => new NamePerson()).toThrow();
    });

    it('should throw error when name is empty', () => {
      expect(() => new NamePerson('')).toThrow();
      expect(() => new NamePerson('   ')).toThrow();

      try {
        new NamePerson('');
      } catch (errors) {
        expect(Array.isArray(errors)).toBe(true);
        const errorArray = errors as ErrorValidation[];
        expect(errorArray).toContainEqual(
          expect.objectContaining({ code: Errors.NAME_EMPTY }),
        );
      }
    });

    it('should throw error when name is too short (less than 3 characters)', () => {
      expect(() => new NamePerson('Jo')).toThrow();

      try {
        new NamePerson('Jo');
      } catch (errors) {
        expect(Array.isArray(errors)).toBe(true);
        const errorArray = errors as ErrorValidation[];
        expect(errorArray).toContainEqual(
          expect.objectContaining({ code: Errors.NAME_TOO_SHORT }),
        );
      }
    });

    it('should throw error when name is too long (150+ characters)', () => {
      const longName = 'A'.repeat(151) + ' B'.repeat(10);

      expect(() => new NamePerson(longName)).toThrow();

      try {
        new NamePerson(longName);
      } catch (errors) {
        expect(Array.isArray(errors)).toBe(true);
        const errorArray = errors as ErrorValidation[];
        expect(errorArray).toContainEqual(
          expect.objectContaining({ code: Errors.NAME_TOO_LONG }),
        );
      }
    });

    it('should throw error when surname is missing', () => {
      expect(() => new NamePerson('João')).toThrow();

      try {
        new NamePerson('João');
      } catch (errors) {
        expect(Array.isArray(errors)).toBe(true);
        const errorArray = errors as ErrorValidation[];
        expect(errorArray).toContainEqual(
          expect.objectContaining({ code: Errors.SURNAME_REQUIRED }),
        );
      }
    });

    it('should throw error when name contains invalid characters', () => {
      expect(() => new NamePerson('João123 Silva')).toThrow();
      expect(() => new NamePerson('João@ Silva')).toThrow();
      expect(() => new NamePerson('João# Silva')).toThrow();

      try {
        new NamePerson('João123 Silva');
      } catch (errors) {
        expect(Array.isArray(errors)).toBe(true);
        const errorArray = errors as ErrorValidation[];
        expect(errorArray).toContainEqual(
          expect.objectContaining({ code: Errors.NAME_NOT_CHARACTERS }),
        );
      }
    });

    it('should accept valid characters including accents, dots, and hyphens', () => {
      expect(() => new NamePerson('José da Silva')).not.toThrow();
      expect(() => new NamePerson('María José')).not.toThrow();
      expect(() => new NamePerson('João-Pedro Silva')).not.toThrow();
      expect(() => new NamePerson('Ana C. Santos')).not.toThrow();
      expect(() => new NamePerson('André Silva')).not.toThrow();
    });

    it('should combine multiple validation errors', () => {
      try {
        new NamePerson('J@');
      } catch (errors) {
        expect(Array.isArray(errors)).toBe(true);
        const errorArray = errors as ErrorValidation[];
        expect(errorArray.length).toBeGreaterThan(1);
        expect(errorArray).toContainEqual(
          expect.objectContaining({ code: Errors.NAME_TOO_SHORT }),
        );
        expect(errorArray).toContainEqual(
          expect.objectContaining({ code: Errors.SURNAME_REQUIRED }),
        );
        expect(errorArray).toContainEqual(
          expect.objectContaining({ code: Errors.NAME_NOT_CHARACTERS }),
        );
      }
    });
  });

  describe('getters', () => {
    const name = new NamePerson('João Pedro da Silva Santos');

    describe('fullName', () => {
      it('should return the complete name', () => {
        expect(name.fullName).toBe('João Pedro da Silva Santos');
      });
    });

    describe('firstName', () => {
      it('should return the first name', () => {
        expect(name.firstName).toBe('João');
      });

      it('should work with simple two-part names', () => {
        const simpleName = new NamePerson('Ana Silva');
        expect(simpleName.firstName).toBe('Ana');
      });
    });

    describe('surnames', () => {
      it('should return all names except the first as an array', () => {
        expect(name.surnames).toEqual(['Pedro', 'da', 'Silva', 'Santos']);
      });

      it('should work with simple two-part names', () => {
        const simpleName = new NamePerson('Ana Silva');
        expect(simpleName.surnames).toEqual(['Silva']);
      });
    });

    describe('lastName', () => {
      it('should return the last name', () => {
        expect(name.lastName).toBe('Santos');
      });

      it('should work with simple two-part names', () => {
        const simpleName = new NamePerson('Ana Silva');
        expect(simpleName.lastName).toBe('Silva');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle names with multiple spaces', () => {
      expect(() => new NamePerson('João   Pedro   Silva')).toThrow();

      try {
        new NamePerson('João   Pedro   Silva');
      } catch (errors) {
        expect(Array.isArray(errors)).toBe(true);
        const errorArray = errors as ErrorValidation[];
        expect(errorArray).toContainEqual(
          expect.objectContaining({ code: Errors.SURNAME_REQUIRED }),
        );
      }
    });

    it('should handle names at the boundary limits', () => {
      const shortValidName = new NamePerson('Jo Silva');
      expect(shortValidName.firstName).toBe('Jo');
      expect(shortValidName.lastName).toBe('Silva');

      const longValidName = `${'A'.repeat(145)} B`;
      const name = new NamePerson(longValidName);
      expect(name.fullName).toBe(longValidName);
    });

    it('should handle names with special valid characters', () => {
      const specialName = new NamePerson('José-Maria da Conceição');
      expect(specialName.firstName).toBe('José-Maria');
      expect(specialName.lastName).toBe('Conceição');
    });
  });
});
