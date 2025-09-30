import { Entity, type iEntityProperties } from '@/shared/entity';
import { NamePerson } from '@/shared/name-person';

export interface iUserProperties extends iEntityProperties {
  name?: string;
}

export class User extends Entity<iUserProperties> {
  readonly name: NamePerson;

  constructor(props: iUserProperties) {
    super(props);
    this.name = new NamePerson(props.name);
  }
}
