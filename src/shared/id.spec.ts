import { describe, expect, it } from 'vitest';
import { Errors } from '@/constants/errors';
import { Id } from './id';

describe('Id', () => {
  it('should create a new Id', () => {
    const id = Id.create;

    expect(id).toBeInstanceOf(Id);
    expect(id.value).toHaveLength(36);
    expect(id.new).toBeTruthy();
  });

  it('should throw an error for invalid UUID', () => {
    expect(() => new Id('invalid-uuid')).toThrowError(Errors.ID_INVALID);
  });

  it('should create an Id with a provided valid UUID', () => {
    const value = Id.create.value;
    const id = new Id(value);

    expect(id).toBeInstanceOf(Id);
    expect(id.value).toBe(value);
    expect(id.new).toBeFalsy();
    expect(id.value).toHaveLength(36);
  });

  it('should compare two Ids for equality', () => {
    const id1 = Id.create;
    const id2 = new Id(id1.value);
    const id3 = Id.create;

    expect(id1.equals(id2)).toBeTruthy();
    expect(id1.equals(id3)).toBeFalsy();
  });

  it('should compare two Ids for difference', () => {
    const id1 = Id.create;
    const id2 = new Id(id1.value);
    const id3 = Id.create;

    expect(id1.different(id2)).toBeFalsy();
    expect(id1.different(id3)).toBeTruthy();
  });
});
