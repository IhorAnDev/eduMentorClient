import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cx = (...classNames: unknown[]) =>
  classNames.filter(Boolean).join(' ');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const myLoader = ({ src }: any) => {
  return src;
};

// display numbers with comma (form string)
export const displayNumbers = (num: number): string =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};