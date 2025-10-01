import { Errors } from '@/constants/errors';
import { ErrorValidation } from '@/error/error-validation';

export class Order {
  constructor(readonly value: number = 1) {
    if (value <= 0) {
      ErrorValidation.throw({ code: Errors.INVALID_ORDER });
    }
  }

  equals(order: Order): boolean {
    return this.value === order.value;
  }

  different(order: Order): boolean {
    return this.value !== order.value;
  }

  compare(order: Order): number {
    if (this.equals(order)) return 0;
    return this.value > order.value ? 1 : -1;
  }

  static order(a: { order: Order }, b: { order: Order }) {
    return a.order.compare(b.order);
  }
}
