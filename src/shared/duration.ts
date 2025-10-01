import { Errors } from '@/constants/errors';
import { ErrorValidation } from '@/error/error-validation';

export class Duration {
  static readonly MINUTE: number = 60;
  static readonly HOUR: number = 3600;

  readonly seconds: number;

  constructor(seconds?: number) {
    if (seconds && seconds < 0) {
      ErrorValidation.throw({ code: Errors.NEGATIVE_DURATION });
    }

    this.seconds = seconds ?? 0;
  }

  sum(duration: Duration): Duration {
    return new Duration(this.seconds + duration.seconds);
  }

  equals(duration: Duration): boolean {
    return this.seconds === duration.seconds;
  }

  get isZero(): boolean {
    return this.seconds === 0;
  }

  get hoursMinute() {
    const { hours, minutes } = this.parts;
    const parseHours = hours.toString().padStart(2, '0');
    const parseMinutes = minutes.toString().padStart(2, '0');

    return hours ? `${parseHours}h ${parseMinutes}m` : `${parseMinutes}m`;
  }

  get hoursMinuteSecond() {
    const { hours, minutes, seconds } = this.parts;
    const parseHours = hours.toString().padStart(2, '0');
    const parseMinutes = minutes.toString().padStart(2, '0');
    const parseSeconds = seconds.toString().padStart(2, '0');

    if (hours) {
      return `${parseHours}h ${parseMinutes}m ${parseSeconds}s`;
    } else if (minutes) {
      return `${parseMinutes}m ${parseSeconds}s`;
    } else {
      return `${parseSeconds}s`;
    }
  }

  get parts() {
    return {
      hours: Math.floor(this.seconds / Duration.HOUR),
      minutes: Math.floor((this.seconds % Duration.HOUR) / Duration.MINUTE),
      seconds: this.seconds % Duration.MINUTE,
    };
  }
}
