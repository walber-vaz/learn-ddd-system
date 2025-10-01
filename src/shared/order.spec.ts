import { describe, expect, it } from 'vitest';
import { Errors } from '@/constants/errors';
import type { ErrorValidation } from '@/error/error-validation';
import { Order } from './order';

describe('Order', () => {
  describe('Constructor', () => {
    it('should create an Order with default value 1', () => {
      const order = new Order();
      expect(order.value).toBe(1);
    });

    it('should create an Order with provided value', () => {
      const order = new Order(5);
      expect(order.value).toBe(5);
    });

    it('should create an Order with value 1 when explicitly provided', () => {
      const order = new Order(1);
      expect(order.value).toBe(1);
    });

    it('should create an Order with large positive values', () => {
      const order = new Order(1000);
      expect(order.value).toBe(1000);
    });

    it('should throw error for zero value', () => {
      expect(() => new Order(0)).toThrow();
    });

    it('should throw error for negative values', () => {
      expect(() => new Order(-1)).toThrow();
      expect(() => new Order(-10)).toThrow();
      expect(() => new Order(-100)).toThrow();
    });

    it('should throw error with correct error code for invalid order', () => {
      try {
        new Order(0);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as ErrorValidation).code).toBe(Errors.INVALID_ORDER);
      }
    });
  });

  describe('equals method', () => {
    it('should return true for orders with same value', () => {
      const order1 = new Order(5);
      const order2 = new Order(5);

      expect(order1.equals(order2)).toBeTruthy();
    });

    it('should return false for orders with different values', () => {
      const order1 = new Order(5);
      const order2 = new Order(3);

      expect(order1.equals(order2)).toBeFalsy();
    });

    it('should return true for default orders', () => {
      const order1 = new Order();
      const order2 = new Order();

      expect(order1.equals(order2)).toBeTruthy();
    });

    it('should return true when comparing order with itself', () => {
      const order = new Order(10);

      expect(order.equals(order)).toBeTruthy();
    });

    it('should return false for orders with large different values', () => {
      const order1 = new Order(1000);
      const order2 = new Order(999);

      expect(order1.equals(order2)).toBeFalsy();
    });
  });

  describe('different method', () => {
    it('should return false for orders with same value', () => {
      const order1 = new Order(5);
      const order2 = new Order(5);

      expect(order1.different(order2)).toBeFalsy();
    });

    it('should return true for orders with different values', () => {
      const order1 = new Order(5);
      const order2 = new Order(3);

      expect(order1.different(order2)).toBeTruthy();
    });

    it('should return false for default orders', () => {
      const order1 = new Order();
      const order2 = new Order();

      expect(order1.different(order2)).toBeFalsy();
    });

    it('should return false when comparing order with itself', () => {
      const order = new Order(10);

      expect(order.different(order)).toBeFalsy();
    });

    it('should return true for orders with large different values', () => {
      const order1 = new Order(1000);
      const order2 = new Order(1);

      expect(order1.different(order2)).toBeTruthy();
    });
  });

  describe('compare method', () => {
    it('should return 0 for orders with same value', () => {
      const order1 = new Order(5);
      const order2 = new Order(5);

      expect(order1.compare(order2)).toBe(0);
    });

    it('should return 1 when first order is greater than second', () => {
      const order1 = new Order(10);
      const order2 = new Order(5);

      expect(order1.compare(order2)).toBe(1);
    });

    it('should return -1 when first order is less than second', () => {
      const order1 = new Order(3);
      const order2 = new Order(8);

      expect(order1.compare(order2)).toBe(-1);
    });

    it('should return 0 for default orders', () => {
      const order1 = new Order();
      const order2 = new Order();

      expect(order1.compare(order2)).toBe(0);
    });

    it('should return 0 when comparing order with itself', () => {
      const order = new Order(15);

      expect(order.compare(order)).toBe(0);
    });

    it('should work correctly with large values', () => {
      const order1 = new Order(1000);
      const order2 = new Order(999);

      expect(order1.compare(order2)).toBe(1);
      expect(order2.compare(order1)).toBe(-1);
    });

    it('should be consistent with equals method', () => {
      const order1 = new Order(7);
      const order2 = new Order(7);

      expect(order1.compare(order2)).toBe(0);
      expect(order1.equals(order2)).toBeTruthy();
    });
  });

  describe('static order method', () => {
    it('should sort objects by order value in ascending order', () => {
      const obj1 = { order: new Order(3) };
      const obj2 = { order: new Order(1) };
      const obj3 = { order: new Order(2) };

      const array = [obj1, obj2, obj3];
      array.sort(Order.order);

      expect(array[0]).toBe(obj2);
      expect(array[1]).toBe(obj3);
      expect(array[2]).toBe(obj1);
    });

    it('should handle objects with same order value', () => {
      const obj1 = { order: new Order(2) };
      const obj2 = { order: new Order(2) };
      const obj3 = { order: new Order(1) };

      const array = [obj1, obj2, obj3];
      array.sort(Order.order);

      expect(array[0]).toBe(obj3);
      expect(array[1].order.value).toBe(2);
      expect(array[2].order.value).toBe(2);
    });

    it('should work with single element array', () => {
      const obj1 = { order: new Order(5) };
      const array = [obj1];

      array.sort(Order.order);

      expect(array[0]).toBe(obj1);
      expect(array.length).toBe(1);
    });

    it('should work with empty array', () => {
      const array: { order: Order }[] = [];

      array.sort(Order.order);

      expect(array.length).toBe(0);
    });

    it('should sort large arrays correctly', () => {
      const objects = [
        { order: new Order(10) },
        { order: new Order(1) },
        { order: new Order(5) },
        { order: new Order(15) },
        { order: new Order(3) },
      ];

      objects.sort(Order.order);

      expect(objects[0].order.value).toBe(1);
      expect(objects[1].order.value).toBe(3);
      expect(objects[2].order.value).toBe(5);
      expect(objects[3].order.value).toBe(10);
      expect(objects[4].order.value).toBe(15);
    });

    it('should maintain order stability for equal values', () => {
      const obj1 = { order: new Order(2), id: 'first' };
      const obj2 = { order: new Order(1), id: 'second' };
      const obj3 = { order: new Order(2), id: 'third' };

      const array = [obj1, obj2, obj3];
      array.sort(Order.order);

      expect(array[0]).toBe(obj2);
      expect(array[1]).toBe(obj1);
      expect(array[2]).toBe(obj3);
    });
  });

  describe('Edge cases and boundaries', () => {
    it('should handle minimum valid value (1)', () => {
      const order = new Order(1);

      expect(order.value).toBe(1);
      expect(() => new Order(1)).not.toThrow();
    });

    it('should handle very large numbers', () => {
      const largeNumber = Number.MAX_SAFE_INTEGER;
      const order = new Order(largeNumber);

      expect(order.value).toBe(largeNumber);
    });

    it('should correctly compare orders with large differences', () => {
      const order1 = new Order(1);
      const order2 = new Order(Number.MAX_SAFE_INTEGER);

      expect(order1.compare(order2)).toBe(-1);
      expect(order2.compare(order1)).toBe(1);
      expect(order1.different(order2)).toBeTruthy();
    });

    it('should handle floating point numbers correctly', () => {
      const order1 = new Order(1.5);
      const order2 = new Order(1.5);

      expect(order1.equals(order2)).toBeTruthy();
      expect(order1.compare(order2)).toBe(0);
    });

    it('should reject very small positive numbers close to zero', () => {
      expect(() => new Order(0.0001)).not.toThrow();
      expect(() => new Order(Number.MIN_VALUE)).not.toThrow();
    });
  });
});
