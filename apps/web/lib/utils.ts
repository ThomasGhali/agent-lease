import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeWords(str: string) {
  return str
    .split(' ') // Split sentence into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize index 0
    .join(' ') // Join the array back into a sentence
}
