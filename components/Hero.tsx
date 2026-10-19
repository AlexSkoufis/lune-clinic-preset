'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { hero } from '@/lib/content';
import { gsap, MQ, useGsap } from '@/lib/motion';
import { nextAvailable } from '@/lib/schedule';
import { requestBooking } from '@/lib/bus';
import Smile from './Smile';

/** Headline with *accent* words, split into words so each can rise in on load. */
function Title({ text }: { text: string }) {
  return (
    <h1 className="hero__title" aria-label={text.replaceAll('*', '')}>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          <span className="hero__word" aria-hidden="true">
            <span className={word.startsWith('*') ? 'is-accent' : undefined}>{word.replaceAll('*', '')}</span>
          </span>{' '}
        </Fragment>
      ))}
    </h1>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  // The smile starts finished (so it is right without JavaScript or motion), then replays from "before"
  const [look, setLook] = useState({ align: 1, shade: 1 });
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => setNext(nextAvailable()), []);

  useGsap(root, () => {
    if (!window.matchMedia(MQ.motion).matches) return;
    gsap.from('.hero__word > span', { yPercent: 110, duration: 1.1, stagger: 0.06, delay: 0.15 });
    gsap.from('.hero__fade', { autoAlpha: 0, y: 20, duration: 1, stagger: 0.09, delay: 0.55 });
    gsap.from('.hero__art', { autoAlpha: 0, scale: 0.94, duration: 1.4, delay: 0.2 });

    const state = { align: 0, shade: 0.1 };
    setLook({ ...state });
    gsap.to(state, {
      align: 1, shade: 1, duration: 2.2, delay: 0.9, ease: 'power3.inOut',
      onUpdate: () => setLook({ align: state.align, shade: state.shade }),
    });

    // The art drifts slightly as the hero scrolls away
    gsap.to('.hero__art', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
  });

  return (
    <section className="hero" id="top" ref={root}>
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__fade">{hero.eyebrow}</p>
          <Title text={hero.title} />
          <p className="hero__lead hero__fade">{hero.lead}</p>

          <div className="hero__cta hero__fade">
            <button type="button" className="btn btn--accent" onClick={() => requestBooking()}>{hero.cta} <span aria-hidden="true">→</span></button>
            <a className="btn btn--line" href="#finder">{hero.secondary}</a>
          </div>

          <ul className="hero__promise hero__fade">
            {hero.promise.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>

        <div className="hero__art">
          <div className="hero__moon" aria-hidden="true" />
          <Smile className="hero__smile" align={look.align} shade={look.shade} title="A smile straightening and brightening" />

          <div className="chip chip--next hero__fade">
            <span className="chip__dot" />
            <span><small>Next available</small>{next ?? 'This week'}</span>
          </div>
          <div className="chip chip--rating hero__fade">
            <strong>{hero.rating.score}</strong>
            <span><small>★★★★★</small>{hero.rating.count}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
