import type { TreatmentId } from './content';

/** Tiny event bus so any section can open the booking form with a treatment already chosen. */
export function requestBooking(treatment?: TreatmentId) {
  window.dispatchEvent(new CustomEvent<TreatmentId | undefined>('lune:book', { detail: treatment }));
}

export function onRequestBooking(fn: (treatment?: TreatmentId) => void) {
  const h = (e: Event) => fn((e as CustomEvent<TreatmentId | undefined>).detail);
  window.addEventListener('lune:book', h);
  return () => window.removeEventListener('lune:book', h);
}

export const money = (n: number, currency = '€') => `${currency}${Math.round(n).toLocaleString('en-GB')}`;
