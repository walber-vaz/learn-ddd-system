import { describe, expect, it } from 'vitest';
import { UserBuilder } from './user-builder';

describe('User', () => {
  it('should create a user', () => {
    const fullName = 'John Doe';
    const email = 'john.doe@example.com';
    const user = UserBuilder.init().withName(fullName).withEmail(email).now();

    expect(user).toBeDefined();
    expect(user.name.fullName).toBe(fullName);
    expect(user.email.value).toBe(email);
    expect(user.password).toBeDefined();
  });

  it('should create a user without password', () => {
    const user = UserBuilder.init().notWithPassword().now();

    expect(user).toBeDefined();
    expect(user.password).toBeUndefined();
  });

  it('should throw error when name is not provided', () => {
    expect(() => {
      UserBuilder.init().notWithName().now();
    }).toThrow();
  });

  it('should throw error when email is not provided', () => {
    expect(() => {
      UserBuilder.init().notWithEmail().now();
    }).toThrow();
  });
});
