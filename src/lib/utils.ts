import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Design tokens
export const theme = {
  gold: '#D4A853',
  goldLight: '#E8C97A',
  goldDim: 'rgba(212,168,83,0.12)',
  bg: '#0A0A0B',
  bgDark: '#08080A',
  bgSide: '#0C0C0E',
  bgCard: '#111113',
  bgCardHover: '#18181B',
  bgHover: '#161619',
  bgInput: '#0E0E11',
  text: '#F5F5F4',
  textDim: '#8A8A8D',
  textMuted: '#9A9A9E',
  border: 'rgba(255,255,255,0.06)',
  green: '#34D399',
  greenDim: 'rgba(52,211,153,0.1)',
  red: '#F87171',
  redDim: 'rgba(248,113,113,0.1)',
  blue: '#60A5FA',
  blueDim: 'rgba(96,165,250,0.1)',
  purple: '#A78BFA',
};

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('mn-MN').format(amount) + '₮';
}

// Format date
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('mn-MN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}
