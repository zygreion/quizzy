import { Quiz } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function upperFirstChar(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function decodeStr(encodedString: string): string {
  return decodeURIComponent(encodedString);
}

// Only shuffle when type = 'multiple'
export function shuffleQuizAnswers(type: Quiz['type'], answers: string[]) {
  if (type === 'boolean') {
    return ['False', 'True'];
  }

  const shuffled = [...answers];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
