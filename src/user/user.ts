import { Email } from '@/shared/email';
import { Entity, type iEntityProperties } from '@/shared/entity';
import type { HashPassword } from '@/shared/hash-password';
import { NamePerson } from '@/shared/name-person';
import { StrongPassword } from '@/shared/strong-password';

export interface iUserProperties extends iEntityProperties {
  name?: string;
  email?: string;
  password?: string;
}

export class User extends Entity<iUserProperties> {
  readonly name: NamePerson;
  readonly email: Email;
  readonly password?: HashPassword;

  constructor(props: iUserProperties) {
    super(props);

    this.name = new NamePerson(props.name);
    this.email = new Email(props.email);
    if (props.password) this.password = new StrongPassword(props.password);
  }
}
