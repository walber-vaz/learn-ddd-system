import { Errors } from '@/constants/errors';
import { Validator } from '@/utils/validator';

export class Name {
  readonly value: string;

  constructor(value: string, min: number, max: number) {
    this.value = value?.trim() ?? '';

    const errors = Validator.toCombine(
      Validator.notEmpty(this.value, Errors.NAME_EMPTY),
      Validator.greaterEqualWant(this.value, min, Errors.NAME_TOO_SHORT),
      Validator.lessEqualWant(this.value, max, Errors.NAME_TOO_LONG),
    );

    if (errors) throw errors;
  }

  get name(): string {
    return this.value;
  }

  get pascalCase(): string {
    return this.value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
