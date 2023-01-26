import {
  differenceInYears,
  getDaysInMonth,
  getDate,
  addDays,
  addHours,
  addMinutes,
  isBefore,
  format,
} from 'date-fns';
import validator from 'validator';

import { IDateProvider } from '../models/IDateProvider';

export class DateFNSDateProvider implements IDateProvider {
  differenceInYears(date: Date, compare_date: Date): number {
    return differenceInYears(date, compare_date);
  }

  getDaysInMonth(date: Date): number {
    return getDaysInMonth(date);
  }

  getDay(date: Date): number {
    return getDate(date);
  }

  addDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  addHours(hours: number): Date {
    return addHours(new Date(), hours);
  }

  addMinutes(minutes: number): Date {
    return addMinutes(new Date(), minutes);
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return isBefore(start_date, end_date);
  }

  format(date: Date): string {
    return format(date, 'dd/MM/yyyy');
  }

  getDateFromString(dateString: string): Date {
    const date = new Date(`${dateString} 00:00:00`);

    return date;
  }

  isDate(dateString: string): boolean {
    return validator.isDate(dateString);
  }
}
