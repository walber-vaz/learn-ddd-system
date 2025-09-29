import { Errors } from '@/constants/errors';

export interface iErrorValidationProps {
  code?: string;
  value?: unknown;
  extras?: object;
}

export class ErrorValidation extends Error {
  readonly code: string;
  readonly value?: unknown;
  readonly extras: unknown;

  constructor(readonly props?: iErrorValidationProps) {
    super(props?.code ?? Errors.UNKNOWN_ERROR);
    this.code = props?.code ?? Errors.UNKNOWN_ERROR;
    this.value = props?.value;
    this.extras = props?.extras ?? {};
  }

  static create(props?: iErrorValidationProps): ErrorValidation {
    return new ErrorValidation(props);
  }

  static throw(props?: iErrorValidationProps): never {
    throw new ErrorValidation(props);
  }
}
