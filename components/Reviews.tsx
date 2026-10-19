'use client';

import { useState } from 'react';
import { faqs, hero, reviews } from '@/lib/content';

/** Patient reviews as a scrolling row of cards, followed by the questions people always ask. */
export default function Reviews() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section section--mint" id="reviews">
      <div className="wrap">
        <header className="head head--row">
          <div>
            <p className="eyebrow" data-reveal>Patients</p>
            <h2 className="display" data-reveal>People come back. That is the review.</h2>
          </div>
          <p className="rating" data-reveal><strong>{hero.rating.score}</strong><span>★★★★★<small>{hero.rating.count}</small></span></p>
        </header>

        <ul className="quotes">
          {reviews.map((r) => (
            <li className="quote" key={r.name} data-reveal>
              <blockquote>“{r.quote}”</blockquote>
              <p><strong>{r.name}</strong><span>{r.detail}</span></p>
            </li>
          ))}
        </ul>

        <div className="faq" id="faq">
          <h2 className="display display--sm" data-reveal>Questions, answered plainly.</h2>
          <div className="faq__list" data-reveal>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div className={isOpen ? 'faq__item is-open' : 'faq__item'} key={f.q}>
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                      {f.q}<span className="menu__icon" aria-hidden="true" />
                    </button>
                  </h3>
                  <p id={`faq-${i}`} hidden={!isOpen}>{f.a}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
