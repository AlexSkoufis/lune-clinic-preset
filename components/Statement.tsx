'use client';

import { useRef } from 'react';
import { statement, stats } from '@/lib/content';
import { gsap, MQ, useGsap } from '@/lib/motion';
import { Count } from './Reveal';

/** The clinic's promise, brightening word by word as it scrolls past, then four figures. */
export default function Statement() {
  const root = useRef<HTMLElement>(null);

  // "[no lectures,]" → highlighted words; brackets are stripped
  let marked = false;
  const words = statement.split(' ').map((raw) => {
    if (raw.startsWith('[')) marked = true;
    const word = { text: raw.replace(/[[\]]/g, ''), marked };
    if (raw.endsWith(']')) marked = false;
    return word;
  });

  useGsap(root, () => {
    if (!window.matchMedia(MQ.motion).matches) return;
    gsap.fromTo('.statement__word', { opacity: 0.16 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: '.statement__text', start: 'top 85%', end: 'bottom 62%', scrub: true },
    });
  });

  return (
    <section className="section statement" ref={root}>
      <div className="wrap">
        <p className="statement__text">
          {words.map((w, i) => (
            <span key={i} className={w.marked ? 'statement__word is-marked' : 'statement__word'}>{w.text} </span>
          ))}
        </p>

        <dl className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label} data-reveal>
              <dt>{s.label}</dt>
              <dd><Count to={s.value} suffix={s.suffix} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
