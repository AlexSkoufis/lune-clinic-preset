import { booking, clinic, hours } from './content';
import { rng } from './motion';

/** "Now" as wall-clock time at the clinic, whatever the visitor's own time zone is. */
export function clinicNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: clinic.timeZone, weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')), date: `${get('year')}-${get('month')}-${get('day')}` };
}

const toMinutes = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));

/** Open/closed right now, with the next change ("Open until 20:00", "Opens Monday 08:00"). */
export function openStatus(now = new Date()) {
  const { day, minutes } = clinicNow(now);
  const today = hours[day];
  if (today && minutes >= toMinutes(today[0]) && minutes < toMinutes(today[1])) {
    return { open: true, text: `Open until ${today[1]}` };
  }
  if (today && minutes < toMinutes(today[0])) return { open: false, text: `Opens today at ${today[0]}` };
  for (let i = 1; i <= 7; i++) {
    const next = hours[(day + i) % 7];
    if (next) {
      const name = i === 1 ? 'tomorrow' : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][(day + i) % 7];
      return { open: false, text: `Opens ${name} at ${next[0]}` };
    }
  }
  return { open: false, text: 'Closed' };
}

export type Slot = { time: string; taken: boolean };
export type BookingDay = { key: string; weekday: string; label: string; isToday: boolean; slots: Slot[] };

/**
 * The next `count` days the clinic is open, each with its appointment times.
 * Which times are "taken" is decided by a seeded random number per date, so the demo looks
 * busy but shows the same thing on every render. Replace with your booking system's availability.
 */
export function bookingDays(count = 6, now = new Date()): BookingDay[] {
  const { minutes, date } = clinicNow(now);
  const [y, m, d] = date.split('-').map(Number);
  const days: BookingDay[] = [];

  for (let offset = 0; days.length < count && offset < 14; offset++) {
    const dt = new Date(Date.UTC(y, m - 1, d + offset));
    const open = hours[dt.getUTCDay()];
    if (!open) continue;
    const key = dt.toISOString().slice(0, 10);
    const random = rng(Number(key.replaceAll('-', '')));
    const slots = booking.slots
      .filter((t) => toMinutes(t) >= toMinutes(open[0]) && toMinutes(t) + 30 <= toMinutes(open[1]))
      .filter((t) => offset > 0 || toMinutes(t) > minutes + 30)
      .map((time) => ({ time, taken: random() < (offset === 0 ? 0.55 : 0.35) }));
    if (!slots.length) continue;
    days.push({
      key,
      isToday: offset === 0,
      weekday: offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : dt.toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' }),
      label: dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }),
      slots,
    });
  }
  return days;
}

/** The first free appointment, e.g. "Today, 16:30". */
export function nextAvailable(now = new Date()) {
  for (const day of bookingDays(6, now)) {
    const slot = day.slots.find((s) => !s.taken);
    if (slot) return `${day.weekday}, ${slot.time}`;
  }
  return null;
}
