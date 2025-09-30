import { Id } from './id';

export interface iEntityProperties {
  id?: string;
}

export abstract class Entity<T extends iEntityProperties> {
  readonly id: Id;
  readonly props: T;

  constructor(props: T) {
    this.id = new Id(props.id);
    this.props = { ...props, id: this.id.value };
  }

  equals(entity: Entity<T>): boolean {
    return this.id.equals(entity.id);
  }

  different(entity: Entity<T>): boolean {
    return this.id.different(entity.id);
  }

  clone(props: T, ...args: unknown[]): this {
    return new (this.constructor as new (props: T, ...args: unknown[]) => this)(
      {
        ...this.props,
        ...props,
      },
      ...args,
    );
  }
}
