import { v7 as uuid, validate } from 'uuid';
import { Errors } from '@/constants/errors';
import { ErrorValidation } from '@/error/error-validation';

export class Id {
  readonly value: string;
  readonly new: boolean;

  constructor(value?: string) {
    this.value = value ?? uuid();
    this.new = !value;

    if (!validate(this.value)) {
      ErrorValidation.throw({ code: Errors.ID_INVALID, value: this.value });
    }
  }

  static get create() {
    return new Id();
  }

  equals(id: Id) {
    return this.value === id.value;
  }

  different(id: Id) {
    return !this.equals(id);
  }
}
