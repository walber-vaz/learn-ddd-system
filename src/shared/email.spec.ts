import { fakerPT_BR as faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { Email } from './email';

describe('Email', () => {
  it('should create an email', () => {
    const email = new Email(faker.internet.email());
    expect(email).toBeInstanceOf(Email);
    expect(email.value).toBeDefined();
  });

  it('should throw an error for invalid email', () => {
    expect(() => new Email('invalid-email')).toThrowError();
  });

  it('should return the username part of the email', () => {
    const email = new Email(faker.internet.email());
    expect(email.username).toBe(email.value.split('@')[0]);
  });

  it('should return the domain part of the email', () => {
    const email = new Email(faker.internet.email());
    expect(email.domain).toBe(email.value.split('@')[1]);
  });

  it('should validate email format correctly', () => {
    expect(Email.isValid(faker.internet.email())).toBeTruthy();
    expect(Email.isValid('invalid-email')).toBeFalsy();
  });

  it('should handle empty email input', () => {
    expect(() => new Email()).toThrowError();
  });
});
