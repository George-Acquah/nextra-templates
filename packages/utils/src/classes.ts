import { type ClassValue, clsx } from 'clsx';
import { tailwindSmartMerge } from 'tailwind-smart-merge';

export function cn(...inputs: ClassValue[]) {
  return tailwindSmartMerge(clsx(inputs));
}
