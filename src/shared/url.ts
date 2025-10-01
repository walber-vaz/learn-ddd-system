import { Errors } from '@/constants/errors';
import { ErrorValidation } from '@/error/error-validation';

export class Url {
  readonly value: string;
  private url: URL;

  constructor(value?: string) {
    this.value = value ?? '';

    if (!Url.isValid(this.value)) {
      ErrorValidation.throw({ code: Errors.URL_INVALID });
    }
    this.url = new URL(this.value);
  }

  get protocol(): string {
    return this.url.protocol;
  }

  get domain(): string {
    return this.url.hostname;
  }

  get path(): string {
    return this.url.pathname;
  }

  get params(): unknown {
    const params = this.url.searchParams.toString().split('&');
    return params.reduce(
      (acc, param) => {
        const [key, value] = param.split('=');
        (acc as Record<string, string | string[]>)[key] = value;
        return acc;
      },
      {} as Record<string, string | string[]>,
    );
  }

  static isValid(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
