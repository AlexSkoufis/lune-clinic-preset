'use client';

import { useEffect, useState } from 'react';
import { clinic, clinicSection, dayNames, hours } from '@/lib/content';
import { clinicNow, openStatus } from '@/lib/schedule';
import { Img } from './Img';

/** Photos of the clinic, what to expect, and opening hours with today marked and a live open/closed line. */
export default function ClinicSection() {
  // Worked out in the browser only, so the server-rendered page never disagrees with the visitor's clock
  const [status, setStatus] = useState<{ open: boolean; text: string } | null>(null);
  const [today, setToday] = useState(-1);

  useEffect(() => {
    const update = () => { setStatus(openStatus()); setToday(clinicNow().day); };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  // Monday first
  const week = [1, 2, 3, 4, 5, 6, 0];

  return (
    <section className="section section--blush" id="clinic">
      <div className="wrap">
        <header className="head head--row">
          <div>
            <p className="eyebrow" data-reveal>The clinic</p>
            <h2 className="display" data-reveal>{clinicSection.title}</h2>
          </div>
          <p className="head__aside" data-reveal>{clinicSection.text}</p>
        </header>

        <div className="rooms">
          {clinicSection.photos.map((p, i) => (
            <figure className={`room room--${i + 1}`} key={p.image} data-reveal>
              <Img image={p.image} alt={p.alt} sizes="(min-width: 900px) 40vw, 92vw" />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="visit">
          <div className="visit__card" data-reveal>
            <h3>Opening hours</h3>
            {status && <p className={status.open ? 'status is-open' : 'status'}><span />{status.text}</p>}
            <dl className="hours">
              {week.map((d) => (
                <div key={d} className={d === today ? 'is-today' : undefined}>
                  <dt>{dayNames[d]}</dt>
                  <dd>{hours[d] ? `${hours[d]![0]} – ${hours[d]![1]}` : 'Closed'}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="visit__card" data-reveal>
            <h3>Find us</h3>
            <address>
              {clinic.address.map((line) => <span key={line}>{line}</span>)}
            </address>
            <p><a href={`tel:${clinic.phone.replaceAll(' ', '')}`}>{clinic.phone}</a><br /><a href={`mailto:${clinic.email}`}>{clinic.email}</a></p>
            <ul className="pills">
              {clinicSection.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>

          <div className="visit__card visit__card--ink" data-reveal>
            <h3>In pain right now?</h3>
            <p>Call the emergency line before 14:00 and we will see you today.</p>
            <a className="visit__tel" href={`tel:${clinic.emergency.replaceAll(' ', '')}`}>{clinic.emergency}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
