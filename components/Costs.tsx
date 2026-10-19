'use client';

import { useEffect, useRef, useState } from 'react';
import { clinic, costsNote, plans, treatments, type TreatmentId } from '@/lib/content';
import { gsap, MQ } from '@/lib/motion';
import { money, requestBooking } from '@/lib/bus';

/** Monthly payment for `total` over `months` at a yearly `apr` (standard loan formula; 0% is a simple split). */
function monthly(total: number, months: number, apr: number) {
  if (months <= 1) return total;
  if (!apr) return total / months;
  const r = apr / 100 / 12;
  return (total * r) / (1 - (1 + r) ** -months);
}

/** A figure that counts to its new value instead of jumping. */
function Rolling({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (!window.matchMedia(MQ.motion).matches) { setShown(value); return; }
    const state = { n: from.current };
    const tween = gsap.to(state, { n: value, duration: 0.6, ease: 'power2.out', onUpdate: () => setShown(state.n) });
    from.current = value;
    return () => { tween.kill(); };
  }, [value]);
  return <>{money(shown, clinic.currency)}</>;
}

/** Tick the treatments you are considering, choose how to pay, and see the total and the monthly amount. */
export default function Costs() {
  const [picked, setPicked] = useState<TreatmentId[]>(['checkup', 'whitening']);
  const [plan, setPlan] = useState(2);

  const toggle = (id: TreatmentId) => setPicked(picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id]);
  const total = treatments.filter((t) => picked.includes(t.id)).reduce((sum, t) => sum + t.from, 0);
  const { months, apr } = plans[plan];
  const perMonth = monthly(total, months, apr);

  return (
    <section className="section" id="costs">
      <div className="wrap">
        <header className="head">
          <p className="eyebrow" data-reveal>Costs</p>
          <h2 className="display" data-reveal>Know the price before you sit down.</h2>
        </header>

        <div className="costs" data-reveal>
          <fieldset className="costs__list">
            <legend>What are you considering?</legend>
            {treatments.map((t) => (
              <label key={t.id} className={picked.includes(t.id) ? 'check is-on' : 'check'}>
                <input type="checkbox" checked={picked.includes(t.id)} onChange={() => toggle(t.id)} />
                <span className="check__box" aria-hidden="true" />
                <span className="check__name">{t.name}</span>
                <span className="check__price">from {money(t.from, clinic.currency)}</span>
              </label>
            ))}
          </fieldset>

          <aside className="costs__card" aria-live="polite">
            <p className="costs__label">Estimated total</p>
            <p className="costs__total"><Rolling value={total} /></p>

            <div className="costs__plans" role="radiogroup" aria-label="How to pay">
              {plans.map((p, i) => (
                <button key={p.label} type="button" role="radio" aria-checked={plan === i} className={plan === i ? 'plan is-active' : 'plan'} onClick={() => setPlan(i)}>
                  {p.label}
                </button>
              ))}
            </div>

            <p className="costs__month">
              {months > 1 ? <><strong><Rolling value={perMonth} /></strong> a month for {months} months</> : <><strong>One payment</strong> on the day</>}
            </p>
            <p className="costs__apr">{months > 1 ? (apr ? `${apr}% APR representative. Total repayable ${money(perMonth * months, clinic.currency)}.` : 'Interest-free. No deposit.') : 'No fees for paying by card.'}</p>

            <button type="button" className="btn btn--accent" disabled={!picked.length} onClick={() => requestBooking(picked[0])}>
              Get a written plan <span aria-hidden="true">→</span>
            </button>
            <p className="note">{costsNote}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
