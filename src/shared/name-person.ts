import { Errors } from '@/constants/errors';
import { Validator } from '@/utils/validator';

export class NamePerson {
  readonly name: string;

  constructor(name?: string) {
    this.name = name?.trim() ?? '';

    const errors = Validator.toCombine(
      Validator.notEmpty(this.name, Errors.NAME_EMPTY),
      Validator.lessWant(this.name, 150, Errors.NAME_TOO_LONG),
      Validator.greaterWant(this.name, 2, Errors.NAME_TOO_SHORT),
      Validator.notEmpty(this.name.split(' ')[1], Errors.SURNAME_REQUIRED),
      Validator.regex(
        this.name,
        /^[A-Za-zÀ-ú.-\s]*$/,
        Errors.NAME_NOT_CHARACTERS,
      ),
    );

    if (errors) throw errors;
  }

  get fullName() {
    return this.name;
  }

  get firstName() {
    return this.name.split(' ')[0];
  }

  get surnames() {
    return this.name.split(' ').slice(1);
  }

  get lastName() {
    return this.name.split(' ').pop() as string;
  }
}
