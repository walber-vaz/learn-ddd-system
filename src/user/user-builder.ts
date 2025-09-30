import { fakerPT_BR as faker } from '@faker-js/faker';
import { type iUserProperties, User } from './user';

export class UserBuilder {
  private constructor(public props: iUserProperties) {}

  static init(): UserBuilder {
    return new UserBuilder({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 12,
        memorable: false,
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        prefix: `$argon2id$v=19$m=65536,t=3,p=4$${faker.string.alphanumeric({
          length: 22,
          casing: 'mixed',
        })}$${faker.string.alphanumeric({
          length: 43,
          casing: 'mixed',
        })}`,
      }),
    });
  }

  withId(id: string): UserBuilder {
    this.props.id = id;
    return this;
  }

  notWithId(): UserBuilder {
    this.props.id = undefined;
    return this;
  }

  withName(name: string): UserBuilder {
    this.props.name = name;
    return this;
  }

  notWithName(): UserBuilder {
    this.props.name = undefined;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.props.email = email;
    return this;
  }

  notWithEmail(): UserBuilder {
    this.props.email = undefined;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.props.password = password;
    return this;
  }

  notWithPassword(): UserBuilder {
    this.props.password = undefined;
    return this;
  }

  now(): User {
    return new User(this.props);
  }
}
