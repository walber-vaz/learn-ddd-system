import { describe, expect, it } from 'vitest';
import { Duration } from './duration';

describe('Duration', () => {
  describe('Constructor', () => {
    it('should create a Duration with zero seconds by default', () => {
      const duration = new Duration();
      expect(duration.seconds).toBe(0);
      expect(duration.hoursMinuteSecond).toBe('00s');
      expect(duration.hoursMinute).toBe('00m');
      expect(duration.isZero).toBeTruthy();
    });

    it('should create a Duration with provided seconds', () => {
      const duration = new Duration(120);
      expect(duration.seconds).toBe(120);
    });

    it('should throw error for negative seconds', () => {
      expect(() => new Duration(-1)).toThrow();
      expect(() => new Duration(-100)).toThrow();
    });

    it('should accept zero seconds', () => {
      const duration = new Duration(0);
      expect(duration.seconds).toBe(0);
      expect(duration.isZero).toBeTruthy();
    });
  });

  describe('Static constants', () => {
    it('should have correct MINUTE constant', () => {
      expect(Duration.MINUTE).toBe(60);
    });

    it('should have correct HOUR constant', () => {
      expect(Duration.HOUR).toBe(3600);
    });
  });

  describe('sum method', () => {
    it('should sum two durations correctly', () => {
      const duration1 = new Duration(100);
      const duration2 = new Duration(200);
      const result = duration1.sum(duration2);

      expect(result.seconds).toBe(300);
      expect(result).toBeInstanceOf(Duration);
    });

    it('should sum with zero duration', () => {
      const duration1 = new Duration(100);
      const duration2 = new Duration(0);
      const result = duration1.sum(duration2);

      expect(result.seconds).toBe(100);
    });

    it('should return new instance when summing', () => {
      const duration1 = new Duration(100);
      const duration2 = new Duration(200);
      const result = duration1.sum(duration2);

      expect(result).not.toBe(duration1);
      expect(result).not.toBe(duration2);
    });
  });

  describe('equals method', () => {
    it('should return true for equal durations', () => {
      const duration1 = new Duration(100);
      const duration2 = new Duration(100);

      expect(duration1.equals(duration2)).toBeTruthy();
    });

    it('should return false for different durations', () => {
      const duration1 = new Duration(100);
      const duration2 = new Duration(200);

      expect(duration1.equals(duration2)).toBeFalsy();
    });

    it('should return true for two zero durations', () => {
      const duration1 = new Duration(0);
      const duration2 = new Duration();

      expect(duration1.equals(duration2)).toBeTruthy();
    });
  });

  describe('isZero getter', () => {
    it('should return true for zero duration', () => {
      const duration = new Duration(0);
      expect(duration.isZero).toBeTruthy();
    });

    it('should return true for default duration', () => {
      const duration = new Duration();
      expect(duration.isZero).toBeTruthy();
    });

    it('should return false for non-zero duration', () => {
      const duration = new Duration(1);
      expect(duration.isZero).toBeFalsy();
    });
  });

  describe('parts getter', () => {
    it('should return correct parts for zero duration', () => {
      const duration = new Duration(0);
      const parts = duration.parts;

      expect(parts.hours).toBe(0);
      expect(parts.minutes).toBe(0);
      expect(parts.seconds).toBe(0);
    });

    it('should return correct parts for seconds only', () => {
      const duration = new Duration(45);
      const parts = duration.parts;

      expect(parts.hours).toBe(0);
      expect(parts.minutes).toBe(0);
      expect(parts.seconds).toBe(45);
    });

    it('should return correct parts for minutes and seconds', () => {
      const duration = new Duration(125);
      const parts = duration.parts;

      expect(parts.hours).toBe(0);
      expect(parts.minutes).toBe(2);
      expect(parts.seconds).toBe(5);
    });

    it('should return correct parts for hours, minutes and seconds', () => {
      const duration = new Duration(3665);
      const parts = duration.parts;

      expect(parts.hours).toBe(1);
      expect(parts.minutes).toBe(1);
      expect(parts.seconds).toBe(5);
    });

    it('should return correct parts for full hours', () => {
      const duration = new Duration(7200);
      const parts = duration.parts;

      expect(parts.hours).toBe(2);
      expect(parts.minutes).toBe(0);
      expect(parts.seconds).toBe(0);
    });
  });

  describe('hoursMinute getter', () => {
    it('should format zero duration', () => {
      const duration = new Duration(0);
      expect(duration.hoursMinute).toBe('00m');
    });

    it('should format minutes only', () => {
      const duration = new Duration(120);
      expect(duration.hoursMinute).toBe('02m');
    });

    it('should format hours and minutes', () => {
      const duration = new Duration(3665);
      expect(duration.hoursMinute).toBe('01h 01m');
    });

    it('should format single digit numbers with leading zeros', () => {
      const duration = new Duration(3605);
      expect(duration.hoursMinute).toBe('01h 00m');
    });

    it('should format double digit hours and minutes', () => {
      const duration = new Duration(43865);
      expect(duration.hoursMinute).toBe('12h 11m');
    });
  });

  describe('hoursMinuteSecond getter', () => {
    it('should format zero duration', () => {
      const duration = new Duration(0);
      expect(duration.hoursMinuteSecond).toBe('00s');
    });

    it('should format seconds only', () => {
      const duration = new Duration(45);
      expect(duration.hoursMinuteSecond).toBe('45s');
    });

    it('should format minutes and seconds', () => {
      const duration = new Duration(125);
      expect(duration.hoursMinuteSecond).toBe('02m 05s');
    });

    it('should format hours, minutes and seconds', () => {
      const duration = new Duration(3665);
      expect(duration.hoursMinuteSecond).toBe('01h 01m 05s');
    });

    it('should format single digit numbers with leading zeros', () => {
      const duration = new Duration(3605);
      expect(duration.hoursMinuteSecond).toBe('01h 00m 05s');
    });

    it('should format double digit values correctly', () => {
      const duration = new Duration(43865);
      expect(duration.hoursMinuteSecond).toBe('12h 11m 05s');
    });

    it('should format exact hour', () => {
      const duration = new Duration(3600);
      expect(duration.hoursMinuteSecond).toBe('01h 00m 00s');
    });

    it('should format exact minute', () => {
      const duration = new Duration(60);
      expect(duration.hoursMinuteSecond).toBe('01m 00s');
    });
  });

  describe('Edge cases', () => {
    it('should handle large durations', () => {
      const duration = new Duration(90061);
      const parts = duration.parts;

      expect(parts.hours).toBe(25);
      expect(parts.minutes).toBe(1);
      expect(parts.seconds).toBe(1);
      expect(duration.hoursMinute).toBe('25h 01m');
      expect(duration.hoursMinuteSecond).toBe('25h 01m 01s');
    });

    it('should handle boundary values', () => {
      const oneMinute = new Duration(60);
      expect(oneMinute.hoursMinuteSecond).toBe('01m 00s');

      const oneHour = new Duration(3600);
      expect(oneHour.hoursMinuteSecond).toBe('01h 00m 00s');

      const almostHour = new Duration(3599);
      expect(almostHour.hoursMinuteSecond).toBe('59m 59s');
    });
  });
});
