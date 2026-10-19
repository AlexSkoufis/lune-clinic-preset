'use client';

import { useEffect, useRef, useState } from 'react';
import { booking, clinic, comforts, team, treatments, type TreatmentId } from '@/lib/content';
import { bookingDays, type BookingDay } from '@/lib/schedule';
import { money, onRequestBooking } from '@/lib/bus';
import { scrollToTarget } from './SmoothScroll';

const steps = ['Reason', 'Clinician', 'Time', 'Details'];

/**
 * Four-step booking: reason → clinician → day and time → details, with a live summary beside it.
 * Other sections open it with a treatment already chosen (see lib/bus.ts).
 * It is a demo: on submit nothing is sent. Connect `submit` to your booking system or email.
 */
export default function Booking() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [reason, setReason] = useState<TreatmentId | null>(null);
  const [who, setWho] = useState<string | null>(null);
  const [days, setDays] = useState<BookingDay[]>([]);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [extras, setExtras] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  // Availability depends on the current time, so it is worked out in the browser
  useEffect(() => setDays(bookingDays()), []);

  useEffect(() => onRequestBooking((treatment) => {
    if (treatment) { setReason(treatment); setWho(null); setStep(1); }
    setSent(false);
    if (root.current) scrollToTarget(root.current, { offset: -70 });
  }), []);

  const treatment = treatments.find((t) => t.id === reason);
  const clinicians = team.filter((p) => !treatment || (p.kinds as readonly string[]).includes(treatment.kind));
  const chosenDay = days[day];
  const canSubmit = name.trim().length > 1 && phone.trim().length > 5;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) setSent(true);
  };
  const reset = () => { setStep(0); setReason(null); setWho(null); setTime(null); setExtras([]); setName(''); setPhone(''); setSent(false); };

  return (
    <section className="section" id="book" ref={root}>
      <div className="wrap">
        <header className="head head--row">
          <div>
            <p className="eyebrow" data-reveal>Book</p>
            <h2 className="display" data-reveal>{booking.title}</h2>
          </div>
          <p className="head__aside" data-reveal>{booking.text}</p>
        </header>

        <div className="book" data-reveal>
          <div className="book__main">
            <ol className="book__steps">
              {steps.map((label, i) => (
                <li key={label} className={i === step ? 'is-current' : i < step ? 'is-done' : undefined}>
                  <button type="button" disabled={i > step || sent} onClick={() => setStep(i)}>
                    <span>{i + 1}</span>{label}
                  </button>
                </li>
              ))}
            </ol>

            <div className="book__pane" aria-live="polite">
              {sent ? (
                <div className="book__done">
                  <div className="book__tick" aria-hidden="true">✓</div>
                  <h3>Thank you, {name.trim().split(' ')[0]}.</h3>
                  <p>On a live site you would now get a text confirming {chosenDay?.weekday.toLowerCase()} at {time}. {booking.demoNote}</p>
                  <button type="button" className="btn btn--line" onClick={reset}>Book another</button>
                </div>
              ) : step === 0 ? (
                <>
                  <h3>What would you like to come in for?</h3>
                  <div className="book__options">
                    {treatments.map((t) => (
                      <button key={t.id} type="button" className={reason === t.id ? 'option is-on' : 'option'} aria-pressed={reason === t.id} onClick={() => { setReason(t.id); setWho(null); setStep(1); }}>
                        {t.name}
                      </button>
                    ))}
                  </div>
                </>
              ) : step === 1 ? (
                <>
                  <h3>Who would you like to see?</h3>
                  <div className="book__people">
                    <button type="button" className={who === 'Any clinician' ? 'pick is-on' : 'pick'} onClick={() => { setWho('Any clinician'); setStep(2); }}>
                      <span className="pick__mono">★</span><span><strong>First available</strong><small>Usually the soonest</small></span>
                    </button>
                    {clinicians.map((p) => (
                      <button key={p.name} type="button" className={who === p.name ? 'pick is-on' : 'pick'} onClick={() => { setWho(p.name); setStep(2); }}>
                        <span className="pick__mono">{p.initials}</span><span><strong>{p.name}</strong><small>{p.role}</small></span>
                      </button>
                    ))}
                  </div>
                </>
              ) : step === 2 ? (
                <>
                  <h3>Pick a day and a time</h3>
                  <div className="book__days">
                    {days.map((d, i) => (
                      <button key={d.key} type="button" className={i === day ? 'day is-on' : 'day'} aria-pressed={i === day} onClick={() => { setDay(i); setTime(null); }}>
                        <small>{d.weekday}</small>{d.label}
                      </button>
                    ))}
                  </div>
                  <div className="book__times">
                    {chosenDay?.slots.map((s) => (
                      <button key={s.time} type="button" className={time === s.time ? 'time is-on' : 'time'} disabled={s.taken} aria-pressed={time === s.time} onClick={() => { setTime(s.time); setStep(3); }}>
                        {s.time}{s.taken && <span className="sr-only"> (taken)</span>}
                      </button>
                    ))}
                  </div>
                  <p className="note">Times shown in clinic time ({clinic.area}). Greyed-out times are taken.</p>
                </>
              ) : (
                <form onSubmit={submit}>
                  <h3>Anything that would help?</h3>
                  <div className="book__options">
                    {comforts.map((c) => {
                      const on = extras.includes(c);
                      return (
                        <button key={c} type="button" className={on ? 'option is-on' : 'option'} aria-pressed={on} onClick={() => setExtras(on ? extras.filter((x) => x !== c) : [...extras, c])}>
                          {c}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book__fields">
                    <label>Your name<input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required /></label>
                    <label>Mobile number<input type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /></label>
                  </div>
                  <button type="submit" className="btn btn--accent" disabled={!canSubmit || !time}>Request this appointment <span aria-hidden="true">→</span></button>
                  <p className="note">{booking.demoNote}</p>
                </form>
              )}
            </div>
          </div>

          <aside className="book__summary" aria-label="Your appointment">
            <h3>Your visit</h3>
            <dl>
              <div><dt>Reason</dt><dd>{treatment?.name ?? '—'}</dd></div>
              <div><dt>With</dt><dd>{who ?? '—'}</dd></div>
              <div><dt>When</dt><dd>{time && chosenDay ? `${chosenDay.weekday} ${chosenDay.label}, ${time}` : '—'}</dd></div>
              <div><dt>Length</dt><dd>{treatment?.duration ?? '—'}</dd></div>
              {extras.length > 0 && <div><dt>We will have ready</dt><dd>{extras.join(', ')}</dd></div>}
            </dl>
            <p className="book__price">
              <small>Guide price</small>
              {treatment ? <>from {money(treatment.from, clinic.currency)}{treatment.unit ? ` ${treatment.unit}` : ''}</> : '—'}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
