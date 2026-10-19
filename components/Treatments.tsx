'use client';

import { useState } from 'react';
import { clinic, treatments, type TreatmentKind } from '@/lib/content';
import { money, requestBooking } from '@/lib/bus';

const tabs: { id: TreatmentKind; label: string }[] = [
  { id: 'dental', label: 'Dental' },
  { id: 'aesthetic', label: 'Aesthetic' },
];

/** Treatments as a price list: pick Dental or Aesthetic, open a row for the detail and a Book button. */
export default function Treatments() {
  const [kind, setKind] = useState<TreatmentKind>('dental');
  const [open, setOpen] = useState<string | null>('checkup');
  const list = treatments.filter((t) => t.kind === kind);

  const pick = (next: TreatmentKind) => {
    setKind(next);
    setOpen(treatments.find((t) => t.kind === next)!.id);
  };

  return (
    <section className="section" id="treatments">
      <div className="wrap">
        <header className="head head--row">
          <div>
            <p className="eyebrow" data-reveal>Treatments</p>
            <h2 className="display" data-reveal>Everything in one place, with the price next to it.</h2>
          </div>
          <div className="tabs" role="tablist" aria-label="Treatment type" data-reveal>
            {tabs.map((t) => (
              <button key={t.id} type="button" role="tab" aria-selected={kind === t.id} className={kind === t.id ? 'tab is-active' : 'tab'} onClick={() => pick(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </header>

        <ul className="menu" data-reveal>
          {list.map((t, i) => {
            const isOpen = open === t.id;
            return (
              <li key={t.id} className={isOpen ? 'menu__item is-open' : 'menu__item'}>
                <button type="button" className="menu__row" aria-expanded={isOpen} aria-controls={`treatment-${t.id}`} onClick={() => setOpen(isOpen ? null : t.id)}>
                  <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="menu__name">{t.name}</span>
                  <span className="menu__blurb">{t.blurb}</span>
                  <span className="menu__price"><small>from</small> {money(t.from, clinic.currency)}{t.unit && <small> {t.unit}</small>}</span>
                  <span className="menu__icon" aria-hidden="true" />
                </button>
                <div className="menu__panel" id={`treatment-${t.id}`} hidden={!isOpen}>
                  <p>{t.detail}</p>
                  <ul className="pills">
                    <li>{t.duration}</li>
                    <li>{t.visits}</li>
                  </ul>
                  <button type="button" className="btn btn--ink btn--sm" onClick={() => requestBooking(t.id)}>Book this <span aria-hidden="true">→</span></button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
