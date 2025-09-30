import { describe, expect, it } from 'vitest';
import { Entity, type iEntityProperties } from './entity';
import { Id } from './id';

interface iTestEntityProperties extends iEntityProperties {
  name?: string;
  age?: number;
}

class TestEntity extends Entity<iTestEntityProperties> {
  constructor(props: iTestEntityProperties) {
    super(props);
  }
}

describe('Entity', () => {
  it('should calc equals for true as same id', () => {
    const id = Id.create.value;
    const entity1 = new TestEntity({ id });
    const entity2 = new TestEntity({ id });

    expect(entity1.equals(entity2)).toBeTruthy();
  });

  it('should calc equals for false as different id', () => {
    const entity1 = new TestEntity({ id: Id.create.value });
    const entity2 = new TestEntity({ id: Id.create.value });

    expect(entity1.equals(entity2)).toBeFalsy();
  });

  it('should create clone entity', () => {
    const entity1 = new TestEntity({
      id: Id.create.value,
      name: 'John',
      age: 30,
    });
    const entity2 = entity1.clone({
      name: 'Jane',
    });

    expect(entity1.id.value).toBe(entity2.id.value);
    expect(entity1.props.name).toBe('John');
    expect(entity2.props.name).toBe('Jane');
    expect(entity1.props.age).toBe(30);
  });

  it('should entity different', () => {
    const entity1 = new TestEntity({
      id: Id.create.value,
      name: 'John',
      age: 30,
    });
    const entity2 = new TestEntity({
      id: Id.create.value,
      name: 'Jane',
      age: 25,
    });

    expect(entity1.different(entity2)).toBeTruthy();
  });
});
